import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DistritosService } from './distritos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  distritos: Array<{ id: number, nome: string }> = [];
  filtro: string = '';

   @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;

  constructor(private distritosService: DistritosService) { }

  ngOnInit() {
    this.distritosService.listar().subscribe(
      retornoApi => this.distritos = retornoApi
    )
  }

   ngAfterViewInit() {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(
        
        debounceTime(200)
      )
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.filtro = target.value;
      });
  }

  filtrar(palavraChave: string) {
    if (palavraChave) {
      palavraChave = palavraChave.toUpperCase();

      this.distritos = this.distritos.filter(a =>
            a.nome.toUpperCase().indexOf(palavraChave) >= 0
        );
    }
  }
}
