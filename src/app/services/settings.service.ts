import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme')

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/megna.css';
    this.linkTheme?.setAttribute('href',url);  
   }

   changeTheme(theme:string){
    
    const url=`./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    
    
  }

  checkCurrentTheme(link:NodeListOf<Element>){
      
    // console.log(link);
      link.forEach(elem =>{
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl= `./assets/css/colors/${btnTheme}.css`;
      // console.log(btnThemeUrl);
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnThemeUrl===currentTheme){
        elem.classList.add('working');
      }
    })
  }
}
