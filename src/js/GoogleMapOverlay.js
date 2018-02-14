
export default class GoogleMapOverlay extends google.maps.OverlayView {
  constructor({ bounds, image, map }) {
    super();

    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    this.div_ = null;

    this.setMap(map);
  }

  onAdd() {
    const div = document.createElement("div");
    div.style.border = "none";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";

    div.style.transition = "opacity 1s"

    const img = document.createElement("img");
    img.src = this.image_;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.position = "absolute";
    div.appendChild(img);

    this.div_ = div;

    const panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  }

  draw() {
    const overlayProjection = this.getProjection();

    const sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    const ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    const div = this.div_;
    div.style.left = `${sw.x}px`;
    div.style.top = `${ne.y}px`;
    div.style.width = `${ne.x - sw.x}px`;
    div.style.height = `${sw.y - ne.y}px`;

    console.log("draw");
  }
}
