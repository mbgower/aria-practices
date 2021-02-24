/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   slider-thermostat.js
 *
 *   Desc:   Vertical and text slider widget that implements ARIA Authoring Practices
 */

'use strict';

class RangeThermostatVertical {
  constructor(domNode) {
    this.labelCelsiusAbbrev = '°C';
    this.labelCelsius = ' degrees Celsius';

    this.domNode = domNode;

    this.rangeNode = domNode.querySelector('input[type="range"]');

    // The input elements are optional to support mobile devices,
    // when a keyboard is not present
    this.valueNode = domNode.querySelector('.range-value');

    // bind a pointermove event handler to move pointer
    this.rangeNode.addEventListener('change', this.onRangeChange.bind(this));
    this.rangeNode.addEventListener('keydown', this.onRangeChange.bind(this));
    this.rangeNode.addEventListener(
      'pointermove',
      this.onRangeChange.bind(this)
    );
  }

  onRangeChange() {
    this.valueNode.textContent =
      parseFloat(this.rangeNode.value).toFixed(1) + this.labelCelsiusAbbrev;
    this.rangeNode.setAttribute(
      'aria-valuetext',
      parseFloat(this.rangeNode.value).toFixed(1) + this.labelCelsius
    );
  }
}

/*
 *   Desc: Text slider widget that implements ARIA Authoring Practices
 */

class RangeThermostatText {
  constructor(domNode) {
    this.domNode = domNode;

    this.rangeNode = domNode.querySelector('input[type="range"]');

    this.buttonNodes = domNode.querySelectorAll('.labels button');

    // Dimensions of the slider focus ring, thumb and rail

    this.rangeNode.addEventListener('change', this.onRangeChange.bind(this));

    this.rangeNode.addEventListener('keydown', this.onRangeChange.bind(this));

    this.rangeNode.addEventListener(
      'pointermove',
      this.onRangeChange.bind(this)
    );

    this.textValues = [];
    for (let i = 0; i < this.buttonNodes.length; i++) {
      let buttonNode = this.buttonNodes[i];
      this.textValues.push(buttonNode.getAttribute('data-valuetext'));
      buttonNode.addEventListener('click', this.onButtonClick.bind(this));
    }
  }

  onRangeChange() {
    this.rangeNode.setAttribute(
      'aria-valuetext',
      this.textValues[this.rangeNode.value]
    );
  }

  onButtonClick(event) {
    var tgt = event.currentTarget;
    var value = parseInt(tgt.getAttribute('data-value'));
    this.rangeNode.value = value;
    this.onRangeChange();
    this.rangeNode.focus();
    event.preventDefault();
    event.stopPropagation();
  }
}

// Initialize Vertical Range widgets on the page
window.addEventListener('load', function () {
  var rangesVertical = document.querySelectorAll('.range-thermostat-vertical');

  for (let i = 0; i < rangesVertical.length; i++) {
    new RangeThermostatVertical(rangesVertical[i]);
  }
});

// Initialize Text Range widgets on the page
window.addEventListener('load', function () {
  var rangesText = document.querySelectorAll('.range-thermostat-text');

  for (let i = 0; i < rangesText.length; i++) {
    new RangeThermostatText(rangesText[i]);
  }
});
