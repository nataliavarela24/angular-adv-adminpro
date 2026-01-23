export interface SubMenuItem {
  titulo: string;
  url: string;
}

export interface MenuItem {
  titulo: string;
  icono: string;
  submenu: SubMenuItem[];
}
