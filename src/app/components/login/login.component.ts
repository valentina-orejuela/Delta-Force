import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from "../../models/login.usuario";
import { Router} from "@angular/router";
import { LoginService } from "../../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {


  public logUsuario: LoginUsuario;


  constructor(
    private _router: Router,
    private _loginService: LoginService
  ) {
  
    this.logUsuario = new LoginUsuario("" , "");

    
   }

  ngOnInit() {
    this._loginService.getUsers().subscribe(
      res => //console.log(res),
      err => console.log(err)
      
      
    );

    
  }

  onSubmit(form){
    var logUsuario = this.logUsuario;
    //console.log("evento submit finalizado");
    //console.log(logUsuario);

    var email = logUsuario.email;
    var password = logUsuario.password;

    this._loginService.loginUsers(email,password).subscribe(
      res => {
        const resultado = res;
        if (resultado) {
          this._router.navigate(['/pagina-principal']);
          
        }else{
          form.reset();
          alert("Usuario o contraseña incorrectas");
        }
        
      },
      err => {
        console.log(<any>err);
        
      }
    )

  }

}