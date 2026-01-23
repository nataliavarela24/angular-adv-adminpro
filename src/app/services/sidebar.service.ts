import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  public menu: MenuItem[] = [];


 cargarMenu() {
  const menuLS = localStorage.getItem('menu');

  if (menuLS) {
    this.menu = JSON.parse(menuLS);
  } else {
    this.menu = [];
  }
}
}
