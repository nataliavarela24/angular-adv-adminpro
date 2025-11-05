import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

   public formSubmitted = false;
  
    public loginForm =this.fb.nonNullable.group({
      email:[localStorage.getItem('email')|| '',[Validators.required, Validators.email]],
      password:['',Validators.required],
      remember:[false]
    
    });

  constructor( private router: Router,
               private fb:FormBuilder,
               private usuarioService: UsuarioService
  ) {

  }
  ngOnInit(): void {
      

  }

  ngAfterViewInit(): void {
    this.googleInit();
      
  }

  googleInit(){
    google.accounts.id.initialize({
          client_id: "345365522990-t7b8cv9cmucm2cc8hu5aut783snkuc2e.apps.googleusercontent.com",
          callback: (response:any) => this.handleCredentialResponse(response)
        });
        google.accounts.id.renderButton(

          this.googleBtn.nativeElement,
          { theme: "outline", size: "large" }  // customization attributes
        );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
    .subscribe(resp => {
      this.router.navigateByUrl('/');
    })

  }
  

  login(){

    this.usuarioService.login( this.loginForm.getRawValue())
    .subscribe( resp => {
      
       if( this.loginForm.get('remember')?.getRawValue()){
        localStorage.setItem('email',this.loginForm.get('email')?.getRawValue());
       }else {

        localStorage.removeItem('email');

       }
       this.router.navigateByUrl('/');

    },(err)=>{
          //si sucede un error 
    
          Swal.fire('Error', err.error.msg, 'error');
        });

  }


}
