const components = {};

components.draggable = {
  mousePressedInside(e) {
    const data = this._getData();
    if (!data) return;

    this.dragging = true;
    this.offsetX = mouseX - data.x;
    this.offsetY = mouseY - data.y;
  },

  mouseDragged(e) {
    const data = this._getData();
    if (!data) return;

    if (this.dragging) {
      this._record.set("x", roundTo(mouseX - this.offsetX, data.snapTo || 1));
      this._record.set("y", roundTo(mouseY - this.offsetY, data.snapTo || 1));
    }
  },

  mouseReleased(e) {
    const data = this._getData();
    if (!data) return;

    if (this.dragging) {
      this._record.set("x", roundTo(mouseX - this.offsetX, data.snapTo || 1));
      this._record.set("y", roundTo(mouseY - this.offsetY, data.snapTo || 1));
    }
    this.dragging = false;
  },
};

components.pixelImage = {
  draw() {
    const data = this._getData();
    if (!data) return;

    noSmooth();
    image(images[data.src], data.x, data.y, data.w, data.h);
  },
};

components.label = {
  draw() {
    const data = this._getData();
    if (!data) return;

    push();
    fill("white");
    textAlign(CENTER);

    text(this._id.substr(-5), data.x + data.w * 0.5, data.y + data.h + 10);
    pop();
  },
};

components.d6 = {
  setup() {
    const data = this._getData();
    if (!data) return;

    if (!data.value) {
      const v = Math.floor(Math.random() * 6) + 1;
      this._record.set("value", v);
    }
  },

  draw() {
    const data = this._getData();
    if (!data) return;

    push();
    fill("black");
    textSize(16);
    textAlign(CENTER, CENTER);
    textFont("Courier New");
    text(data.value, data.x + data.w * 0.5, data.y + data.h * 0.5);
    pop();
  },

  mousePressedInside(e) {
    const v = Math.floor(Math.random() * 6) + 1;

    this._record.set("value", v);
  },
};

function roundTo(n, b) {
  return Math.round(n / b) * b;
}
