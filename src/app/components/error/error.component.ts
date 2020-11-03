import { Component, OnInit } from '@angular/core';
import { IError } from '../../services/models';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorData: IError;

  constructor() { }

  ngOnInit(): void {
    console.log(this.errorData);
  }

}
