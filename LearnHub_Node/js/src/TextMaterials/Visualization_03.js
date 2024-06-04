import { drawArrow } from '../../lib/draw';

const VECTOR_DICT = {
    '닭': {
        '고기': '닭고기',
        '새끼': '병아리',
        '수컷': '수탉',
        '암컷': '암탉',
    },
    '돼지': {
        '고기': '돼지고기',
        '새끼': '새끼돼지',
        '수컷': '수퇘지',
        '암컷': '암퇘지',
    },
    '소': {
        '고기': '소고기',
        '새끼': '송아지',
        '수컷': '수소',
        '암컷': '암소',
    },
};
const VECTOR_ANGLE = {
    '닭': 4.7569,
    '돼지': 0.2236,
    '소': 5.8419,
    '고기': 0.8561,
    '새끼': 4.9235,
    '수컷': 2.4629,
    '암컷': 3.5854,
};

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.dropEffect = 'move';
}

document.addEventListener('DOMContentLoaded', () => {
    const
        bases = [
            document.getElementById('base-chicken'),
            document.getElementById('base-pig'),
            document.getElementById('base-cow'),
        ],
        derives = [
            document.getElementById('derive-meat'),
            document.getElementById('derive-young'),
            document.getElementById('derive-male'),
            document.getElementById('derive-female'),
        ],
        canv = document.getElementById('visualizer'),
        ctx = canv.getContext('2d');

    let base, derive;

    function redraw() {
        const
            base_len = 100,
            derive_len = 60,
            cx = canv.width/2,
            cy = canv.height/2;

        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.lineWidth = 4;

        if(!base && !derive) {
            ctx.fillStyle = '#1e387f';
            ctx.beginPath();
            ctx.arc(cx, cy, 8, 0, 2*Math.PI);
            ctx.fill();
            return;
        }

        const
            x1 = base
                ? cx + base_len*Math.cos(VECTOR_ANGLE[base])
                : cx,
            y1 = base
                ? cy + base_len*Math.sin(VECTOR_ANGLE[base])
                : cy,
            x2 = derive
                ? x1 + derive_len*Math.cos(VECTOR_ANGLE[derive])
                : x1,
            y2 = derive
                ? y1 + derive_len*Math.sin(VECTOR_ANGLE[derive])
                : y1;

        if(base) {
            ctx.fillStyle = ctx.strokeStyle = '#3d70ff';
            drawArrow(ctx, cx, cy, x1, y1, 10);
        }
        if(derive) {
            ctx.fillStyle = ctx.strokeStyle = '#ff761c';
            drawArrow(ctx, x1, y1, x2, y2, 10);
        }
        if(base && derive) {
            ctx.fillStyle = ctx.strokeStyle = '#037f66';
            ctx.lineWidth = 2;
            drawArrow(ctx, cx, cy, x2, y2, 10);
        }

        if(base) {
            const baseBelow = VECTOR_ANGLE[base] < Math.PI;
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = baseBelow ? 'top' : 'bottom';
            ctx.fillText(
                base,
                x1, y1 + (baseBelow ? 8 : -8)
            );
            if(derive) {
                const textBelow = VECTOR_ANGLE[derive] < Math.PI;
                ctx.textBaseline = textBelow ? 'top' : 'bottom';
                ctx.fillText(
                    VECTOR_DICT[base][derive],
                    x2, y2 + (textBelow ? 8 : -8)
                );
            }
        }
    }

    for(const x of bases)
        x.addEventListener('dragstart', dragStart);
    for(const x of derives)
        x.addEventListener('dragstart', dragStart);
    canv.addEventListener('dragenter', e => {
        e.preventDefault();
        canv.classList.add('dragenter');
    });
    canv.addEventListener('dragleave', () => {
        canv.classList.remove('dragenter');
    })
    canv.addEventListener('dragover', e => e.preventDefault());
    canv.addEventListener('drop', e => {
        e.preventDefault();
        canv.classList.remove('dragenter');

        const data = e.dataTransfer.getData('text/plain');
        if(data[0] == '+')
            derive = data.substring(1);
        else
            base = data;
        redraw();
    });
    redraw();
});