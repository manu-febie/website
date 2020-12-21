class TypeWriter {
    constructor(elem, words, wait = 2000) {
        this.elem = elem
        this.words = words
        this.txt = ''
        this.wordIndex = 0
        this.wait = parseInt(wait, 10)
        this.type()
        this.isDeleting = false
    }

    type() {
        // current index of word
        const current = this.wordIndex % this.words.length

        const fullTxt = this.words[current]

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0,this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0,this.txt.length + 1)
        }

        // insert txt into element
        this.elem.innerHTML = `<span class="txt">${this.txt}</span>`

        // initial typesped
        let typeSpeed = 150

        if (this.isDeleting) {
            typeSpeed /= 2
        }

        // if word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // make pause at end
            typeSpeed = this.wait;
            // set delete to true
            this.isDeleting = true  
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false
            this.wordIndex++
            typeSpeed = 500
        }

        setTimeout(() => this.type(), typeSpeed)
    }
}

// init on DOM load
document.addEventListener('DOMContentLoaded', init)

// init app
function init() {
    const elem = document.querySelector('.typer')
    const words = JSON.parse(elem.getAttribute('data-words'))
    const wait = elem.getAttribute('data-wait')
    // init typwriter
    new TypeWriter(elem, words, wait)
}

