import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificacion } from '../modelos/notificacion';
import { Pedido } from '../modelos/pedido';
import { Platos } from '../modelos/platos';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComandasService {

  private BASE_URL: string = "http://localhost/api/";
  private COMANDOS: string = "cocina/comandos/";
  private COMANDOSCAM: string = "cocina/comandosCam/";
  private PLATOS: string = "cocina/servicios/";
  private SUPLEMENTOS: string = "cocina/supPlatos/";
  private ESTADOPED: string = "cocina/estadoSegui/";
  private ESTADOPLATO: string = "cocina/estadoPlato/";
  private NOTIFICACIONES: string = "cocina/notifiCamareros/";


  private _lista_comandos:Pedido[]=[];
  private _lista_platos:Platos[]=[];
  private _lista_noti:Notificacion[]=[];

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  
  pedidosRes(idRes):void{
    this._lista_comandos=[];

    const options: any = {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this._authService.token)
    };
    
    this._http.get(this.BASE_URL+this.COMANDOS+idRes, options).subscribe(
      (data:any)=>{
        for(let i=0;i<data.data.length;i++){
          let codCom=data.data[i].IdCom;
          let estadoActual=data.data[i].Seguimiento;
          let tipo=data.data[i].Tipo;
          let fecha=data.data[i].Fecha;
          let codMesa=data.data[i].CodigoMesas;
          let comen=data.data[i].Comensales;

          let pedido:Pedido={
            codCom:codCom,
            estadoActual:estadoActual,
            tipo:tipo,
            fecha:fecha,
            codMesa:codMesa,
            Comensales:comen,
          }

          this._lista_comandos.push(pedido);
        }
        this._authService.token = data.refreshToken;

      });

  }

  pedidosResCam(idRes):void{
    this._lista_comandos=[];

    const options: any = {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this._authService.token)
    };

    this._http.get(this.BASE_URL+this.COMANDOSCAM+idRes,options).subscribe(
      (data:any)=>{
        for(let i=0;i<data.data.length;i++){
          let codCom=data.data[i].IdCom;
          let estadoActual=data.data[i].Seguimiento;
          let tipo=data.data[i].Tipo;
          let fecha=data.data[i].Fecha;
          let codMesa=data.data[i].CodigoMesas;
          let comen=data.data[i].Comensales;

          let pedido:Pedido={
            codCom:codCom,
            estadoActual:estadoActual,
            tipo:tipo,
            fecha:fecha,
            codMesa:codMesa,
            Comensales:comen,
          }

          this._lista_comandos.push(pedido);
        }
        this._authService.token = data.refreshToken;

      });

  }

  platoPedidos(codComan):void{
    this._lista_platos=[];

    const options: any = {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this._authService.token)
    };

    this._http.get(this.BASE_URL+this.PLATOS+codComan,options).subscribe(
      (data:any)=>{
        for(let i=0;i<data.data.length;i++){
          let idPlato=data.data[i].IdPlatos;
          let nombre=data.data[i].Nombre;
          let estadoActual=data.data[i].Estado;
          let observaciones=data.data[i].Observaciones;
          let cantidad=data.data[i].Cantidad;

          var sup:string[]=[];
          this._http.get(this.BASE_URL+this.SUPLEMENTOS+idPlato+"/"+codComan).subscribe(
            (sup:any)=>{
              for(let x=0;x<sup.data.length;x++){
                sup.push(sup.data[x].Nombre);
              }
            });

          let platos:Platos={
            nombre:nombre,
            estadoActual:estadoActual,
            cantidad:cantidad,
            observaciones:observaciones,
            suplementos:sup,
            idPlato:idPlato
          }

          this._lista_platos.push(platos);
        }
        this._authService.token = data.refreshToken;

      });

  }

  notifi(idRes):void{
    this._lista_noti=[];
    this._http.get(this.BASE_URL+this.NOTIFICACIONES+idRes).subscribe(
      (data:any)=>{
        for(let i=0;i<data.data.length;i++){
          let codMesa=data.data[i].CodigoMesas;
          let tipo=data.data[i].Tipo;
          let texto=data.data[i].Texto;

          let notificacion:Notificacion={
            codMesa:codMesa,
            tipo:tipo,
            texto:texto,
          }

          this._lista_noti.push(notificacion);
        }


      });

  }
  //CambEstado
  cambiarEstadoPedi(com,seguimiento):void{
    const options: any = {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this._authService.token)
    };

    this._http.get(this.BASE_URL+this.ESTADOPED+com+"/"+seguimiento,options).subscribe(
      (data:any)=>{
        this._authService.token = data.refreshToken;
      });

  }

  cambiarEstadoPlato(com,plato,estado):void{
    const options: any = {
      headers: new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this._authService.token)
    };
    this._http.get(this.BASE_URL+this.ESTADOPLATO+com+"/"+plato+"/"+estado,options).subscribe(
      (data:any)=>{
        this._authService.token = data.refreshToken;
      });

  }
  //Getters
  get listaPedidos():Pedido[]{
    return this._lista_comandos;
  }

  get listaPlatos():Platos[]{
    return this._lista_platos;
  }

  get listaNoti():Notificacion[]{
    return this._lista_noti;
  }
}
