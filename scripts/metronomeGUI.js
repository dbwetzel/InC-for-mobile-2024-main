const metroGUI = p => {
    var slider;
    var selectSynth;
    var syncSlider;
    var click, tap, ost;

    p.setup = function(){
        p.createCanvas(350, 120);
        //slider = new TSlider(p, p.width/2, p.height/2, p.width / 3);
        selectSynth = p.createSelect();
        selectSynth.class("synthSequenceMenu");
        selectSynth.position((p.width / 2) - 75, p.height * 2/3);
        selectSynth.option("Synth 1");
        selectSynth.option("FM Synth");
        selectSynth.option("Something Bouncy");
        //tempo sync
        syncSlider = p.createSlider(-10, 10, 0, 0.5);
        syncSlider.id("tSlider");
        syncSlider.position(p.width/2-75, p.height/2-30);
        syncSlider.size(150);

        syncSlider.input(() =>{
            Tone.Transport.bpm.value = bpm * (syncSlider.value() * 0.01 + 1);
            //  console.log(Tone.Transport.bpm.value);
              //tempo.value = Tone.Transport.bpm.value;
        });

        syncSlider.changed(() => {
            // snap back to original bpm on release
            syncSlider.value(0); 
            Tone.Transport.bpm.value = bpm;
            //tempo.value = Tone.Transport.bpm.value;
          
          }, false);
        //buttons
        click = new SyncButton(p, 40, 30, "click");
        tap = new SyncButton(p, 40, 90, "tap sync");
        ost = new SyncButton(p, 300, p.height/2, "ostinato");
    }

    p.draw = function(){
        p.background(200);
        p.textAlign(p.CENTER);
        p.fill(0);
        p.text("'phase sync' tempo", p.width/2, 10);
        let t = Math.trunc(Tone.Transport.bpm.value);
        // let t = Math.trunc(bpm); //bpm defined globally in metronome.js
        p.text(t + " bpm", p.width/2, p.height / 2+8);
        p.textAlign(p.LEFT);
        p.text("<-slower", p.width/2 - 75, p.height/2);
        p.textAlign(p.RIGHT);
        p.text("faster->", p.width/2 + 75, p.height/2);
        tap.display();
        click.display();
        ost.display();
    }

    p.mousePressed = function(){
        let d = document.getElementById("metronome");
        if(d.display == "block"){
            if(p.dist(p.mouseX, p.mouseY, click.x, click.y) < 30){
                //start click
            }
            if(p.dist(p.mouseX, p.mouseY, tap.x, tap.y) < 30){
                //tap sync
            }
            if(p.dist(p.mouseX, p.mouseY, ost.x, ost.y) < 30){
                //start ostinato
            }
        }
    }
}

class SyncButton {
    constructor(_p, _x, _y, _l){
        this.p = _p;
        this.x = _x;
        this.y = _y;
        this.w = 55;
        this.label = _l;
        this.color = this.p.color("#a0144f");
        this.border = this.p.color("#febc17");

    }
    setColor(c, b){
        this.color = c;
        this.border = b;
    }

    display(){
        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.fill(this.color);
        this.p.stroke(this.border);
        this.p.strokeWeight(4);
        this.p.ellipse(0, 0, this.w);
        this.p.noStroke();
        this.p.textAlign(this.p.CENTER);
        this.p.fill(255);
        this.p.text(this.label, 0, 3);
        this.p.pop();

    }
}

