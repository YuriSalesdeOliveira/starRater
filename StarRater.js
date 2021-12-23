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
        const stars = this.createStars()

        stars.forEach(star => rater.appendChild(star))

        shadow.appendChild(rater)
        shadow.appendChild(style)
    }

    createRater()
    {
        const rater = document.createElement('div')
        rater.classList.add('star-rater')

        return rater
    }

    createStars()
    {
        const createStar = (_, key) => {

            const star = document.createElement('span')
            star.classList.add('star')
            star.setAttribute('data-value', ++key)
            star.innerHTML = '&#9733;'

            return star
        }

        return Array.from({ length: 5 }, createStar)
    }

    style()
    {
        const style = document.createElement('style')
        style.innerText = `
            .star-rater {
                color: red;
            }
        `

        return style
    }
}

customElements.define('star-rater', StarRater)
