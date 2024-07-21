class ImageDatas {
    imagePath;
    imageDetails = [];

    sequence;
    sequenceInterval;
    sequenceOffset
    frameWidth;
    frameHeight;

    constructor(path, sequence, sequenceInterval, sequenceOffset, frameWidth, frameHeight) {
        this.imagePath = path;
        this.sequence = sequence;
        this.sequenceInterval = sequenceInterval;
        this.sequenceOffset = sequenceOffset;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.createImageDetails();
    }

    createImageDetails() {
        for (let i = 0; i < this.sequence; i++) {
            let posX = (i * this.sequenceInterval) + this.sequenceOffset;
            this.imageDetails.push(new imageDetail(posX, 0, this.frameWidth, this.frameHeight));
        };
    }

}