class StarRater extends HTMLElement
{
    constructor()
    {
        super()

        this.build()
    }

    build()
    {
        const shadow = this.attachShadow({ mode: 'open' })

        const style = this.style()
        const rater = this.createRater()
        this.stars = this.createStars()

        this.stars.forEach(star => rater.appendChild(star))

        shadow.appendChild(rater)
        shadow.appendChild(style)
    }

    createRater()
    {
        const rater = document.createElement('div')
        rater.classList.add('star-rater')

        rater.addEventListener('mouseout', this.resetRating.bind(this))

        return rater
    }

    resetRating()
    {
        this.currentRating = this.getAttribute('data-rating') ?? 0
        this.highlightStar()
    }

    createStars()
    {
        const createStar = (_, key) => {

            const star = document.createElement('span')
            star.classList.add('star')
            star.setAttribute('data-value', ++key)
            star.innerHTML = '&#9733;'

            star.addEventListener('click', this.setRating.bind(this))
            star.addEventListener('mousemove', this.ratingHover.bind(this))

            return star
        }

        return Array.from({ length: 5 }, createStar)
    }

    ratingHover(event)
    {
        this.currentRating = event.currentTarget.getAttribute('data-value')
        this.highlightStar()
    }

    highlightStar()
    {
        this.stars.forEach(star => {
            
            star.style.color = star.getAttribute('data-value') <= this.currentRating ?
            '#d4ab00' :
            'gray'

        })
    }

    setRating(event)
    {
        this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'))
    }

    style()
    {
        const style = document.createElement('style')
        style.innerText = `
            .star {
                cursor: pointer;
                font-size: 6rem;
                color: gray;
            }
        `

        return style
    }
}

customElements.define('star-rater', StarRater)
