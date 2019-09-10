import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { WorkItemsService } from './../work-items.service';
import { WorkItems } from './workitems';

@Component({
  selector: 'app-work-items-lista',
  templateUrl: './work-items-lista.component.html',
  styleUrls: ['./work-items-lista.component.scss'],
  preserveWhitespaces: true
})

export class WorkItemsListaComponent implements OnInit {

  workitems: WorkItems[];
  listaTipos: string[];
  valorTipoAtual = '';
  workitemsCache: WorkItems[];
  ordenaData = 'asc';

  constructor(private service: WorkItemsService) { }

  ngOnInit() {
    this.service.list()
    .subscribe(dados => this.workitemsCache = dados);

    this.service.list()
    .subscribe(dados => this.workitems = dados.sort((a: WorkItems, b: WorkItems) => {
      return +new Date(a.data) - +new Date(b.data);
    }));

    this.service.list()
    .subscribe(dados => this.listaTipos = [... new Set(dados.map(item => item.tipo))]);
  }

  ordenacaoData() {
    if (this.ordenaData === 'asc') {
      this.ordenaData = 'desc';
      this.workitems = this.workitems.sort((a: WorkItems, b: WorkItems) => {
        return +new Date(a.data) + +new Date(b.data);
      });
      console.log(this.ordenaData);
    } else {
      this.ordenaData = 'asc';
      this.workitems = this.workitems.sort((a: WorkItems, b: WorkItems) => {
        return +new Date(a.data) - +new Date(b.data);
      });
      console.log(this.ordenaData);
    }
  }

  filtraTipo(evento: MouseEvent) {
    const elements = (document.getElementsByName('tipoWorkItems') as any as HTMLInputElement[]);
    const filtroTipos: string[] = new Array();

    for (const element of elements) {
      if (element.type === 'checkbox') {
        if (element.checked) {
          filtroTipos.push(element.value);
        }
      }
    }

    if (filtroTipos.length === 0) {
      this.workitems = this.workitemsCache.sort((a: WorkItems, b: WorkItems) => {
        if (this.ordenaData === 'asc') {
          console.log('filtra tipo asc');
          return +new Date(a.data) - +new Date(b.data);
        } else {
          console.log('filtra tipo desc');
          return +new Date(a.data) + +new Date(b.data);
        }
      });
    } else {
      const filtros = { tipo: filtroTipos };
      this.workitems = this.workitemsCache.filter(({ tipo }) => filtros.tipo.includes(tipo));

      this.workitems.sort((a: WorkItems, b: WorkItems) => {
        if (this.ordenaData === 'asc') {
          console.log('filtra tipo asc');
          return +new Date(a.data) - +new Date(b.data);
        } else {
          console.log('filtra tipo desc');
          return +new Date(a.data) + +new Date(b.data);
        }
      });
    }
  }
}
