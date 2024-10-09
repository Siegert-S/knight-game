class AnimatedObject extends DrawableObject {
    imgCache = {};
    currentImage = 0;
    lastImage;
    status = 'idle';

    upDateCount = 0;

    IDLE;

    animationImages = {
    }

    constructor(x = 0, y = 0) {
        super(x, y);
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    setImages(name, arrayOfImages) {
        this.animationImages[name] = arrayOfImages;
        this.loadImages(arrayOfImages);
    }

    upDate() {
        this.upDateCount++;
        let check = this.upDateCount % 6 == 0;
        if (check) {
            this.animateObject();
        }
    }

    animateObject() {
        this.selectImage();
    }

    selectImage() {
        if (this.status == 'idle' || this.status == 'walk') {
            this.setImage(this.animationImages[this.status]);
        } else {
            if (this.lastImage == 'idle' || this.lastImage == 'walk') {
                this.currentImage = 0;
                this.setImage(this.animationImages[this.status]);
            } else if (this.currentImage < this.animationImages[this.status].length) {
                this.setImage(this.animationImages[this.status]);
            } else {
                if (this.stopAnimateImage()) {
                    this.status = 'idle';
                    this.currentImage = 0;
                    this.setImage(this.animationImages[this.status]);
                }
            }
        }
    }

    setImage(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
        this.lastImage = this.status;
    }

    stopAnimateImage() {
        if (this.lastImage == this.status) {
            if (this.status == 'dead') {
                setTimeout(() => {
                    this.deleteSelf();
                }, 1000);
                return false;
            }
        }
        return true;
    }


}