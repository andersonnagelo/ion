import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { StatusType } from '../core/types';
import { NotificationComponent } from '../notification/notification.component';

interface OptionsNotification {
  fixed?: boolean;
  type?: StatusType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private rootViewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private setOptionsInInstance(
    componentRef: ComponentRef<NotificationComponent>,
    options: OptionsNotification
  ) {
    options &&
      Object.keys(options).forEach((option) => {
        componentRef.instance[option] = options[option];
      });
  }

  public setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainerRef = viewContainerRef;
  }

  public newNotification(
    title: string,
    message: string,
    options?: OptionsNotification
  ) {
    if (this.rootViewContainerRef) {
      const cFactory = this.componentFactoryResolver.resolveComponentFactory(
        NotificationComponent
      );
      const componentRef = this.rootViewContainerRef.createComponent(cFactory);
      componentRef.instance.title = title;
      componentRef.instance.message = message;

      this.setOptionsInInstance(componentRef, options);
    }
  }
}
