import { Component, render } from 'preact';
import h from 'preact-hyperscript-h';
import linkstate from 'linkstate';
import debounce from 'debounce';
import Case from 'case';
import * as utils from './utils';
import './style.css';

class App extends Component {

  componentWillMount() {
    this.renderCanvas = debounce(this.renderCanvas.bind(this), 200, true);
  }

  componentDidMount() {
    const inputWrappers = this.form.querySelectorAll('.input');
    let i = inputWrappers.length;

    document.body.onresize = () => this.renderCanvas();

    for (const basicInput of document.querySelectorAll('.basic .input')) {
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = basicInput.offsetHeight + 50;
      basicInput.appendChild(canvas);
    }
    this.renderCanvas();

  }

  componentDidUpdate() {
    this.renderCanvas();
  }


  renderCanvas() {
    let i = 1;
    const getColor = i => i < 7
      ? '#ea5d0d'
      : i < 10
      ? '#8a85cf'
      : '#66bea4';
    const inputs = document.querySelectorAll('.basic .input');
    for (const input of inputs) {
      const canvas = input.querySelector('canvas');
      const context = canvas.getContext('2d');
      context.lineWidth = 1;
      const color = getColor(i);
      context.beginPath();
      context.moveTo(2, 2);
      context.arc(2, 2, 2, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();

      const next = inputs[i++];
      const nextColor = getColor(i);
      if (next) {
        context.beginPath();
        context.moveTo(2, 2);
        context.lineTo(2, input.offsetHeight + 16);
        if (color === nextColor) {
          context.strokeStyle = color;
        } else {
          const gradient = context.createLinearGradient(0, 0, 0, input.offsetHeight + 16);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, nextColor);
          context.strokeStyle = gradient;
        }
        context.stroke();
      }
    }
  }

  render() {
    return h.div('.main', { ref: ref => this.mainElement = ref }, [
      h.canvas({ ref: ref => this.canvas = ref }),
      h.form({
        ref: ref => this.form = ref,
      }, [
        h.div('.name', [
          h.input({
            name: 'name',
            placeholder: 'NAME and SURNAME',
          }),
        ]),
        h.div('.image', [
          h.div('Image'),
        ]),
        h.div('.basic', [
          // utils.input(this, 'gender'),
          utils.input(this, 'age'),
          utils.input(this, 'personalType'),
          utils.input(this, 'education'),
          utils.input(this, 'liveWith'),
          utils.input(this, 'occupation'),
          utils.input(this, 'quote'),
          utils.input(this, 'hobbies', 3),
          utils.input(this, 'needs', 4),
          utils.input(this, 'goals', 4),
          utils.input(this, 'expectation', 4),
          utils.input(this, 'wherePreferToExercise', 3),
        ]),
        h.div('.additional', [
          utils.text(this, 'aDayInTheLife'),
          utils.text(this, 'experienceWithFitness'),
          utils.text(this, 'preferFitnessMethod'),
          utils.text(this, 'biggestChallengeWithFitness'),
          utils.text(this, 'solutionAlreadyTried'),
          utils.text(this, 'yourSolution'),
        ]),
      ]),
      h.pre({ style: 'position:fixed;bottom:0;right:0;font-size:1em' }, JSON.stringify(this.state, null, 2)),
    ]);
  }
}

render(h(App), document.body);
document.body.addEventListener('submit', e => e.target.nodeName === 'FORM' && e.preventDefault(), true);
