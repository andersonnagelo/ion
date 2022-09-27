import { IconType } from './../icon/icon.component';
import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NotificationService } from '../services/notification.service';

export interface IonMessageProps {
  label: string;
  type?: MessageStatusType;
  iconType?: IconType;
}

export type MessageStatusType =
  | 'positive'
  | 'negative_alert'
  | 'negative_erro'
  | 'warning'
  | 'info'
  | 'custom';

export const icontypes = {
  positive: 'check-solid',
  negative_alert: 'exclamation-solid',
  negative_erro: 'close-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  custom: 'plus-solid',
};

@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() label!: string;
  @Input() type = 'positive';
  @Input() iconType?;

  constructor(
    private notification: NotificationService,
    public viewContainerRef: ViewContainerRef
  ) {}

  setIcon() {
    this.iconType = icontypes[this.type];
  }

  ngOnInit(): void {
    this.notification.setViewContainerRef(this.viewContainerRef);

    this.notification.newNotification(
      'Criado com sucesso',
      'O usuário foi criado no setor',
      {
        type: 'info',
        fixed: true,
      }
    );

    this.notification.newNotification(
      'Criado com sucesso',
      'O usuário foi criado no setor'
    );

    this.setIcon();
  }
}
