import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PopupComponent } from './components/popup/popup.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public fireFlags: boolean = true
  @ViewChild('videoContainer', { read: ViewContainerRef }) videoContainer: ViewContainerRef;
  name: string = 'SUBIN';

  constructor(private resolver: ComponentFactoryResolver, private location: Location) {
    setTimeout(() => {
      this.fireFlags = false;
    }, 3000)
    if (this.location.path()) {
      this.name = this.location.path().replace('/', '')?.toUpperCase()
    }
  }
  ngOnInit(): void {

    setTimeout(() => {
      this.videoContainer.clear();
      const component = this.resolver.resolveComponentFactory(PopupComponent);
      let componentRef = this.videoContainer.createComponent(component);
      componentRef.instance.close.subscribe(res => {
        this.videoContainer.clear()
      })
    }, 5000)
  }
}
