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
    for (const inputWrapper of inputWrappers) {
      const input = inputWrapper.querySelector('input');
      // input.onchange = linkstate(this, input.getAttribute('name'));
    }

    this.renderCanvas();
    document.body.onresize = () => this.renderCanvas();
    this.setState({
      'this.mainElement.offsetWidth': this.mainElement.offsetWidth,
      'this.canvas.offsetWidth': this.canvas.offsetWidth,
      // 'this.mainElement.scrollLeft': this.mainElement.scrollLeft,
      // 'this.canvas.scrollLeft': this.canvas.scrollLeft,
      // 'this.mainElement.clientLeft': this.mainElement.clientLeft,
      // 'this.canvas.clientLeft': this.canvas.clientLeft,
    });
  }

  componentDidUpdate() {
    this.renderCanvas();
  }


  renderCanvas() {
    const canvas = this.canvas;
    // canvas.width = this.mainElement.offsetWidth;
    canvas.width = canvas.offsetWidth;
    canvas.height = this.mainElement.offsetHeight;
    const context = canvas.getContext('2d');
    const container = document.querySelector('.basic');
    const inputs = document.querySelectorAll('.basic .input');

    context.lineWidth = 1;

    let i = 1;
    // const x = window.innerWidth / 2.05;
    const x = container.offsetLeft - 10;
    const offsetTop = 0;

    const getColor = i => i < 7
      ? '#ea5d0d'
      : i < 10
      ? '#8a85cf'
      : '#66bea4';

    for (const input of inputs) {
      context.beginPath();
      const color = getColor(i);
      const begin = input.offsetTop + offsetTop;
      context.moveTo(x, begin);
      context.arc(x, begin, 2, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.moveTo(x, begin + 2);
      const next = inputs[i++];
      const nextColor = getColor(i);
      if (next) {
        const end = next.offsetTop + offsetTop - 2;
        context.lineTo(x, end);
      }
      if (color === nextColor) {
        context.strokeStyle = color;
      } else {
        const gradient = context.createLinearGradient(50, 50, 150, 150);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, nextColor);
        context.strokeStyle = gradient;
      }
      context.fill();
      context.stroke();
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
          utils.input(this, 'aDayInTheLife'),
          utils.input(this, 'experienceWithFitness'),
          utils.input(this, 'preferFitnessMethod'),
          utils.input(this, 'biggestChallengeWithFitness'),
          utils.input(this, 'solutionAlreadyTried'),
          utils.input(this, 'yourSolution'),
        ]),
      ]),
      h.pre({ style: 'position:fixed;bottom:0;right:0;font-size:1em' }, JSON.stringify(this.state, null, 2)),
    ]);
  }
}

render(h(App), document.body);
document.body.addEventListener('submit', e => e.target.nodeName === 'FORM' && e.preventDefault(), true);
