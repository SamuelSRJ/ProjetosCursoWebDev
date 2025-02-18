import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public precoAlcool: number | null = null;  // Mantendo como número ou null
  public precoGasolina: number | null = null;  // Mantendo como número ou null
  public resultado: string = "Resultado";

  constructor() {}

  calcular() {
    // Validar se os campos foram preenchidos corretamente
    if (this.precoAlcool !== null && !isNaN(this.precoAlcool) && this.precoGasolina !== null && !isNaN(this.precoGasolina)) {
      var pAlcool = this.precoAlcool;
      var pGasolina = this.precoGasolina;

      if(pAlcool / pGasolina >= 0.7) {
        this.resultado = "Melhor abastecer com gasolina";
      } else {
        this.resultado = "Melhor abastecer com álcool";
      }

    } else {
      this.resultado = "Um ou mais campos não foram preenchidos corretamente";
    }

  }

}
