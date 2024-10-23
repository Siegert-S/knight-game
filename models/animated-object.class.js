class AnimatedObject extends DrawableObject {
    imgCache = {};
    currentImage = 0;
    lastImage;
    status = 'idle';

    upDateCount = 0;

    IDLE;
    doAnimationCycle = true;
    animationImages = {
    }

    /**
     * Constructor for the object.
     * 
     * Initializes the object with provided x and y coordinates and calls the parent constructor.
     * 
     * @param {number} [x=0] - The x-coordinate of the object. Defaults to 0.
     * @param {number} [y=0] - The y-coordinate of the object. Defaults to 0.
     */
    constructor(x = 0, y = 0) {
        super(x, y);
    }

    /**
     * Loads images into the image cache.
     * 
     * @param {string[]} array - An array of image paths to load.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    /**
     * Sets the animation images for a specific action and loads them into the cache.
     * 
     * @param {string} name - The name of the action (e.g., 'idle', 'walk').
     * @param {string[]} arrayOfImages - An array of image paths associated with the action.
     */
    setImages(name, arrayOfImages) {
        this.animationImages[name] = arrayOfImages;
        this.loadImages(arrayOfImages);
    }

    /**
     * Updates the object and animates it every 6th frame.
     */
    upDate() {
        this.upDateCount++;
        let check = this.upDateCount % 6 == 0;
        if (check) {
            this.selectImage();
        }
    }

    /**
     * Selects the current image to display based on the object's status.
     * 
     * The image is chosen based on the status (e.g., 'idle', 'walk'). If the animation has finished, it resets.
     */
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
                this.resetImage();
            }
        }
    }

    /**
     * Sets the current image for rendering.
     * 
     * @param {string[]} images - An array of image paths.
     */
    setImage(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
        this.lastImage = this.status;
    }

    /**
     * Resets the animation cycle when necessary.
     * 
     * If the animation cycle is completed, it stops the animation and sets the status to 'idle'.
     */
    resetImage() {
        if (this.doAnimationCycle) {
            this.doAnimationCycle = this.stopAnimateImage();
            if (this.doAnimationCycle) {
                this.status = 'idle';
                this.currentImage = 0;
                this.setImage(this.animationImages[this.status]);
            }
        }
    }

    /**
     * Stops the image animation if the object is 'dead', and triggers further actions.
     * 
     * If the object is dead, it either triggers a game over for characters or deletes the object after a delay.
     * 
     * @returns {boolean} - Returns false if the animation should stop, otherwise true.
     */
    stopAnimateImage() {
        if (this.lastImage == this.status && this.status == 'dead') {
            let target = this;
            setTimeout(() => {
                if (target instanceof Character) {
                    Character.storage[0].gameOver = true;
                } else {
                    this.deleteSelf();
                }
            }, 1000);
            return false;
        }
        return true;
    }

}