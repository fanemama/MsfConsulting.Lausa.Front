import { StudentLocationModel } from './model/student-location.model';
import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import * as signalR from '@microsoft/signalr';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import Overlay from 'ol/Overlay';
import { formatDate } from '@angular/common';
import { MapService } from './service/map.service';
import { LocationModel } from './model/location.model';
import XYZ from 'ol/source/XYZ';
import { View } from 'ol';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements  OnInit, OnDestroy {
  trackedVehicle: { [id: number]: Feature<Point> } = {};
  key = '83NXyEkHfTFExCPdSd9o';
  map!: Map;
  overlay!: any;
  connection!: signalR.HubConnection;
  @ViewChild('popup') popupDiv: any;
  @ViewChild('popupContent') popupContentDiv: any;

  private popupstudent?: StudentLocationModel;
  showPopUp = false;
  constructor(
    private mapService: MapService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.map = this.createMap();

    this.mapService.getAllStudentLocation().subscribe((studentLocation) => {
      this.configurePopupForStudents();
      this.AddTrackingstudentsToMap(studentLocation);
    });

    this.initSignalR();
  }

  private initSignalR() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44304/locationHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      this.connection.start();
      console.log('SignalR Connected.');
      this.connection.on('LocationChanged', (location: LocationModel) =>
        this.UpdatestudentLocation(location)
      );
    } catch (err) {
      console.log(err);
    }
  }

  private UpdatestudentLocation(location: LocationModel) {
    const feature = this.trackedVehicle[location.studentId];
    if (feature) {
      const point = feature.getGeometry();
      const coordinate = this.computeCoordinate(location);
      point?.setCoordinates(coordinate);
      const style = feature.getStyle() as Style;
      const image = style?.getImage();
      image.setRotation(this.degreesToradians(location.heading));

      if (this.popupstudent?.id == location.studentId) {
        this.overlay.setPosition(coordinate);
      }
    }
  }

  private createMap() {
    return new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${this.key}`,
            tileSize: 512,
          }),
        }),
      ],
      target: 'ol-map',
    });
  }

  private AddTrackingstudentsToMap(students: StudentLocationModel[]) {
    const features: Feature<Point>[] = [];
    let feature;
    for (const student of students) {
      feature = this.createVehicleFeature(student);
      this.trackedVehicle[student.id] = feature;
      features.push(feature);
    }

    const locationLayers = new VectorLayer({
      source: new VectorSource({ features: features }),
    });
    this.map.addLayer(locationLayers);
  }

  closeStudentPopUp() {
    this.showPopUp = false;
  }

  private configurePopupForStudents() {
    this.overlay = new Overlay({
      element: this.popupDiv.nativeElement,
      autoPan: false,
    });
    this.map.addOverlay(this.overlay);

    // display popup on click
    this.map.on('click', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(
        evt.pixel,
        function (feature) {
          return feature as Feature<Point>;
        }
      );
      if (feature) {
        this.popupstudent = feature?.get('student') as StudentLocationModel;
        if (this.popupstudent) {
          this.showPopUp = true;
          this.popupContentDiv.nativeElement.innerHTML = this.buildPopupHtml(
            this.popupstudent
          );
          this.overlay.setPosition(feature.getGeometry()?.getCoordinates());
        }
      }
    });
  }

  private buildPopupHtml(student: StudentLocationModel): string {
    return `
    <p>
    Nom  : ${student.lastName}<br>
    prenom   : ${student.firstName}<br>
    Vitesse : ${student.liveLocation.speed} Km/h<br>
    Date    : ${formatDate(
      student.liveLocation.date,
      'dd/MM/yyyy HH:mm:ss',
      this.locale
    )}<br>
    </p>`;
  }

  createVehicleFeature(student: StudentLocationModel): Feature<Point> {
    const color = this.getRandomColor();
    const feature = new Feature({
      geometry: new Point(this.computeCoordinate(student.liveLocation)),
      student: student,
    });
    var hackerStyle = new Style({
      // image: new CircleStyle({
      //   radius: 7,
      //   fill: new Fill({ color: color }),
      //   stroke: new Stroke({
      //     color: 'white',
      //     width: 2,
      //   }),
      // }),
      image: new Icon({
        anchor: [0.5, 0.6],
        src: 'assets/up-arrow_2.png',
        color: color,
        rotation: student.liveLocation.heading,
      }),
    });
    feature.setStyle(hackerStyle);
    return feature;
  }

  computeCoordinate(location: LocationModel) {
    return olProj.transform(
      [location.longitude, location.latitude],
      'EPSG:4326',
      'EPSG:3857'
    );
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  degreesToradians(degree: number) {
    return (degree * Math.PI) / 180.0;
  }

  ngOnDestroy(): void {
    this.connection.stop();
  }
}
