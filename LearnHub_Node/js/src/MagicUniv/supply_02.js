import FFT from 'fft.js';
import { drawGraph } from '../../lib/draw';
import { lerp } from '../../lib/math';

const TAU = 2*Math.PI;
const fft256 = new FFT(256);

function sliderRandom() {
    return 1 - Math.floor(41*Math.random())/20;
}

document.addEventListener('DOMContentLoaded', () => {
    const
        canvP = [
            document.getElementById('fourier-practice-1'),
            document.getElementById('fourier-practice-2'),
            document.getElementById('fourier-practice-3'),
        ],
        ctxP = canvP.map(canv => canv.getContext('2d')),
        canvPs = document.getElementById('fourier-practice-sum'),
        ctxPs = canvPs.getContext('2d'),
        canvDi = document.getElementById('fourier-demo-input'),
        ctxDi = canvDi.getContext('2d'),
        canvDo = document.getElementById('fourier-demo-output'),
        ctxDo = canvDo.getContext('2d'),
        sliders = [
            document.getElementById('slider-practice-1'),
            document.getElementById('slider-practice-2'),
            document.getElementById('slider-practice-3'),
        ],
        retryPractice = document.getElementById('retry-practice'),
        runDemo = document.getElementById('run-demo');

    const
        FFT_HEIGHT_MP = canvDi.height/2,
        FFT_CANV_HEIGHT = canvDo.height/FFT_HEIGHT_MP;
    let practice, fft;
    const wave = [...Array(256)].map((_, i) =>
        Math.sin(TAU*i/256)
    );

    function initPractice() {
        practice = [
            sliderRandom(),
            sliderRandom(),
            sliderRandom(),
        ];
        for(const slider of sliders)
            slider.value = sliderRandom();
        updatePractice();
    }
    function updatePractice() {
        const coeff = sliders.map(x => x.valueAsNumber);
        for(let i = 0; i < 3; i++) {
            ctxP[i].clearRect(0, 0, canvP[i].width, canvP[i].height);
            ctxP[i].strokeStyle = 'blue';
            ctxP[i].lineWidth = 3;
            drawGraph(
                ctxP[i],
                x => coeff[i]*Math.sin((i + 1)*TAU*x),
                0, 1,
                -3, 3
            );
        }
        ctxPs.clearRect(0, 0, canvPs.width, canvPs.height);
        ctxPs.strokeStyle = 'red';
        ctxPs.lineWidth = 1;
        drawGraph(
            ctxPs,
            x =>
                practice[0]*Math.sin(1*TAU*x) +
                practice[1]*Math.sin(2*TAU*x) +
                practice[2]*Math.sin(3*TAU*x),
            0, 1,
            -3, 3
        );
        ctxPs.strokeStyle = 'blue';
        ctxPs.lineWidth = 3;
        drawGraph(
            ctxPs,
            x =>
                coeff[0]*Math.sin(1*TAU*x) +
                coeff[1]*Math.sin(2*TAU*x) +
                coeff[2]*Math.sin(3*TAU*x),
            0, 1,
            -3, 3
        );
    }

    function drawWave(xfrom, xto, yfrom, yto) {
        xfrom = Math.round(xfrom);
        xto = Math.round(xto);
        if(xfrom == xto) {
            if(0 <= xfrom && xfrom < 256)
                wave[xfrom] = yfrom/FFT_HEIGHT_MP - 1;
        } else {
            if(xfrom > xto) {
                const xtemp = xfrom;
                xfrom = xto;
                xto = xtemp;
                const ytemp = yfrom;
                yfrom = yto;
                yto = ytemp;
            }
            for(let x = Math.max(xfrom, 0); x <= xto && x < 256; x++) {
                const y = yfrom + (x - xfrom)/(xto - xfrom)*(yto - yfrom);
                wave[x] = y/FFT_HEIGHT_MP - 1;
            }
        }
        updateWave();
    }
    function updateWave() {
        ctxDi.clearRect(0, 0, canvDi.width, canvDi.height);
        ctxDi.strokeStyle = 'black';
        ctxDi.lineWidth = 3;
        drawGraph(
            ctxDi,
            x => wave[Math.floor((x%256 + 256)%256)],
            0, 256,
            -1, 1
        );
    }
    function updateFFT() {
        const
            waveMax = Math.max(...wave),
            waveMin = Math.min(...wave),
            waveAvg = wave.reduce((acc, x) => acc + x, 0)/256,
            fftResult = fft256.createComplexArray();
        fft256.realTransform(fftResult, wave);
        const
            sines = [...Array(128)].map((_, i) => {
                const
                    re = (
                        i == 127
                            ? fftResult[2*(i + 1)]
                            : 2*fftResult[2*(i + 1)]
                    )/256,
                    im = (
                        i == 127
                            ? fftResult[2*(i + 1) + 1]
                            : 2*fftResult[2*(i + 1) + 1]
                    )/256;
                return [i + 1, re, im, Math.hypot(re, im)];
            })
                .sort((x, y) => y[3] - x[3])
                .filter((x, i) => i == 0 || x[3] >= 0.005),
            heightLimit = canvDo.height/FFT_HEIGHT_MP;

        fft = {
            initial: wave.map(x => x - waveAvg),
            initialY: (waveMax - waveAvg)*FFT_HEIGHT_MP,
            sines: [],
            timestamp: Date.now(),
        };
        let
            height = waveMax - waveMin + 0.05,
            residual = fft.initial;

        for(const [index, re, im, magnitude] of sines) {
            residual = residual.map((fx, x) =>
                fx - re*Math.cos(index*TAU*x/256) + im*Math.sin(index*TAU*x/256)
            );
            fft.sines.push({
                index,
                re, im, magnitude, y: (height + magnitude)*FFT_HEIGHT_MP,
                residual,
            });
            height += 2*magnitude + 0.05;
            if(height >= heightLimit)
                break;
        }
    }

    for(const slider of sliders)
        slider.addEventListener('input', updatePractice);
    retryPractice.addEventListener('click', initPractice);
    canvDi.addEventListener('mousedown', e => {
		if(!(e.buttons & 1))
			return;
		const
            { left, top } = e.target.getBoundingClientRect(),
            xto = e.clientX - left,
            yto = e.clientY - top;
        drawWave(
            xto, xto,
            canvDi.height - yto, canvDi.height - yto
        );
    });
    canvDi.addEventListener('mousemove', e => {
		if(!(e.buttons & 1))
			return;
		const
            { left, top } = e.target.getBoundingClientRect(),
            xto = e.clientX - left,
            yto = e.clientY - top;
		drawWave(
            xto - e.movementX, xto,
            canvDi.height - (yto - e.movementY), canvDi.height - yto
        );
    });
    runDemo.addEventListener('click', updateFFT);

    initPractice();
    updateWave();
    updateFFT();
    fft.timestamp = 0;

    requestAnimationFrame(function updateFFTOutput() {
        function drawSine(index, re, im, y) {
            const yfrom = FFT_CANV_HEIGHT*(y/canvDo.height - 1);
            drawGraph(
                ctxDo,
                x => re*Math.cos(index*TAU*x) - im*Math.sin(index*TAU*x),
                offset, 1 + offset,
                yfrom, yfrom + FFT_CANV_HEIGHT
            );
        }
        function drawWave(wave, y) {
            const yfrom = FFT_CANV_HEIGHT*(y/canvDo.height - 1);
            drawGraph(
                ctxDo,
                x => wave[Math.floor((x%256 + 256)%256)],
                256*offset, 256 + 256*offset,
                yfrom, yfrom + FFT_CANV_HEIGHT
            );
        }

        const
            now = Date.now(),
            offset = now%4000/4000,
            t = (now - fft.timestamp)/2000;
        ctxDo.clearRect(0, 0, canvDo.width, canvDo.height);
        ctxDo.strokeStyle = 'black';
        ctxDo.lineWidth = 3;
        drawWave(fft.initial, fft.initialY);
        ctxDo.strokeStyle = 'blue';
        for(let i = 0; i < Math.round(t) && i < fft.sines.length; i++) {
            const { index, re, im, magnitude, y } = fft.sines[i];
            ctxDo.lineWidth = 3*Math.sqrt(magnitude);
            drawSine(index, re, im, y);
        }
        if(t < fft.sines.length) {
            const
                uRaw = t%1,
                index = Math.floor(t),
                sine = fft.sines[index],
                waveSrc = index == 0
                    ? fft.initial
                    : fft.sines[index - 1].residual,
                waveDest = sine.residual,
                ySrc = index == 0
                    ? fft.initialY
                    : fft.sines[index - 1].y,
                yDest = sine.y,
                widthSrc = 3*Math.sqrt(
                    index == 0
                        ? 1
                        : fft.sines[index - 1].magnitude
                ),
                widthDest = 3*Math.sqrt(sine.magnitude);
            if(uRaw < 0.5) {
                const
                    u = 1 - (2*uRaw - 1)**2,
                    y = lerp(ySrc, yDest, u);

                ctxDo.strokeStyle = 'blue';
                ctxDo.lineWidth = widthDest;
                ctxDo.globalAlpha = u;
                drawSine(sine.index, sine.re, sine.im, y);
                ctxDo.globalAlpha = 1;

                ctxDo.strokeStyle = 'black';
                ctxDo.lineWidth = widthSrc;
                drawWave(waveSrc, y);
            } else {
                const u = 1 - (2*uRaw - 2)**2;
                ctxDo.strokeStyle = 'blue';
                ctxDo.lineWidth = widthDest;
                ctxDo.globalAlpha = 1 - u;
                drawSine(sine.index, (1 - u)*sine.re, (1 - u)*sine.im, sine.y);
                ctxDo.globalAlpha = 1;

                ctxDo.strokeStyle = 'black';
                ctxDo.lineWidth = lerp(widthSrc, widthDest, u);
                drawWave(
                    [...Array(256)].map((_, i) =>
                        lerp(waveSrc[i], waveDest[i], u)
                    ),
                    sine.y
                );
            }
        } else if(t < fft.sines.length + 0.5) {
            const
                u = 2*(t - fft.sines.length),
                sine = fft.sines[fft.sines.length - 1];
            ctxDo.strokeStyle = 'black';
            ctxDo.lineWidth = 3*Math.sqrt(sine.magnitude);
            ctxDo.globalAlpha = 1 - u;
            drawWave(sine.residual, sine.y);
            ctxDo.globalAlpha = 1;
        }
        requestAnimationFrame(updateFFTOutput);
    });
});
