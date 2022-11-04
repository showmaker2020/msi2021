const canvans = document.getElementById('canvas1');
const ctx = canvans.getContext('2d');
canvans.width = window.innerWidth;
canvans.height = window.innerHeight;
const particlesArray = [];
let hue = 0 ;


window.addEventListener('resize', function(){
    canvans.width = window.innerWidth;
    canvans.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined ,
}

canvans.addEventListener('click', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for ( let i =0; i< 10; i++){
        particlesArray.push(new Particle());
    }
});

canvans.addEventListener('mousemove', function(e){
    mouse.x= e.x;
    mouse.y= e.y;
    for ( let i =0; i< 5; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor (){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvans.width;
        // this.y = Math.random() * canvans.height;
        this.size = Math.random() * 15 + 1 ;
        this.speedX = Math.random() * 3 - 1.5 ;
        this.speedY = Math.random() * 3 - 1.5 ;   
        this.color = 'hsl('+ hue +', 100%, 50%)';
     }
     update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if ( this.size > 0.2) this.size -= 0.1;
     }
     draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,  this.y, this.size, 0, Math.PI * 2)
        ctx.fill();
    }
}



function handleParticles(){
    for (let i=0 ; i < particlesArray.length ; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for(let j = i; j < particlesArray.length ; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x ;
            const dy = particlesArray[i].y - particlesArray[j].y ;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance <100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWith = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }   
        if (particlesArray[i].size <=0.3) {
            particlesArray.splice( i, 1);
            i--;
        }
     }   
}

function animate(){
    ctx.clearRect(0, 0, canvans.width, canvans.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
    // ctx.fillRect(0, 0, canvans.width, canvans.height);
    handleParticles();
    hue+=2;
    requestAnimationFrame(animate);    
}
animate()
