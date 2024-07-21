class AnimatedObject extends DrawableObject {
    imgCache = {};
    currentImage = 0;
    lastImage;
    status = 'idle';

    IDLE;

    animationImages = {
    }



    constructor(x = 0, y = 0) {
        super(x, y);
        // this.startAnimation();
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    setImages(name, arrayofimages) {
        this.animationImages[name] = arrayofimages;
        this.loadImages(arrayofimages);
    }

    startAnimation() {
        this.setAndSaveIntervall(() => { this.animateObject(); }, 1000 / 10)
    }

    animateObject() {
        this.test();
        // this.animateImage(this.animationImages[this.status]);
        // if (this.status == 'idle') {
        //     this.animateImage(this.IDLE);
        //     console.log(this.animationImages[this.status]); 
        // }
    }

    animateImage(images) {
        // if (this.currentImage < images.length) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
        this.lastImage = this.status;
        // } else {
        //     this.stopAnimateImage();
        //     this.currentImage = 0;
        // }

    }

    test() {
        if (this.status == 'idle' || this.status == 'walk') {
            this.animateImage(this.animationImages[this.status]);
        } else {
            if (this.lastImage == 'idle' || this.lastImage == 'walk') {
                this.currentImage = 0;
                this.animateImage(this.animationImages[this.status]);
            } else if (this.currentImage < this.animationImages[this.status].length) {
                this.animateImage(this.animationImages[this.status]);
            } else {
                if (this.stopAnimateImage()) {
                    this.status = 'idle';
                    this.currentImage = 0;
                    this.animateImage(this.animationImages[this.status]);
                }
            }
        }
    }

    stopAnimateImage() {
        return true;
    }


}