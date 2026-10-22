/* Pièce n° 3 : la ligne « reprises sur provisions et transferts de charges » de l'année examinée. */
(function () {
  'use strict';

  var O = window.KuhnOutils;
  var A = window.Affaire;
  var e = A.ex(A.annee);
  var v = {
    total: O.nombre(e.reprises_et_transferts, 1),
    provisions: O.nombre(e.reprises_provisions, 1),
    frais: O.nombre(e.transferts, 1),
    annee: A.annee
  };

  var provisions = document.getElementById('part-provisions');
  var frais = document.getElementById('part-frais');
  provisions.style.flex = e.reprises_provisions + ' 1 0';
  frais.style.flex = e.transferts + ' 1 0';
  provisions.textContent = O.gabarit('Provisions relâchées · {provisions}', v);
  frais.textContent = O.gabarit('Frais refacturés · {frais}', v);

  document.getElementById('total').textContent = O.gabarit('Total de la ligne : {total} M€ en {annee}', v);
  document.getElementById('ligne').setAttribute('aria-label',
    O.gabarit('{total} M€ = {provisions} M€ de provisions relâchées + {frais} M€ de frais refacturés', v));
  document.getElementById('note').textContent = O.gabarit('{total} = {provisions} + {frais} ! Ce ne sont pas que des provisions…', v);
})();
