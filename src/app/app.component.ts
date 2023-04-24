import { Component, OnInit } from '@angular/core';

declare function customInitFuntion():any; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'adminPro';
  ngOnInit(): void {
    customInitFuntion();
  }
}
