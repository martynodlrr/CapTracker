import Box from '@mui/material/Box'
import './index.css'

const StackRender = () => {
    const techs = [
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg", alt: "React", href: "https://react.dev/" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", alt: "Redux", href: "https://redux.js.org/" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg", alt: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg", alt: "Material-UI", href: "https://mui.com/" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg", alt: "Python", href: "https://www.python.org/" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original-wordmark.svg", alt: "SQLalchemy", href: "https://www.sqlalchemy.org/" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", alt: "SQLite3 (for development)", href: "https://www.sqlite.org/index.html" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg", alt: "PostgreSQL (for production)", href: "https://www.postgresql.org/" },
        { src: "https://image.similarpng.com/very-thumbnail/2020/06/Amazon-web-services-logo-PNG.png", alt: "AWS", href: "https://aws.amazon.com/" },
        { src: "https://www.vectorlogo.zone/logos/auth0/auth0-ar21.svg", alt: "Auth0", href: "https://auth0.com/" }
    ]

    return (
        <Box component="footer" className="footer">
            <div className="tech-section">
                {techs.map((tech, index) => (
                    <a
                        key={index}
                        href={tech.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="tech-icon"
                            src={tech.src}
                            alt={tech.alt}
                        />
                    </a>
                ))}
            </div>
            <div className="profile-section">
                <div className="personal-links">
                    <a href="https://martynodlrr.site/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    <a href="https://github.com/Martynodlrr" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/martynodlrr/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                <a
                    href='https://martynodlrr.site/'
                    rel="noopener noreferrer"
                    target='_blank'
                >
                <img src='https://avatars.githubusercontent.com/u/123061539?v=4' alt="Head snap of Martyn (pretty cool guy, if I say so myself)" className="profile-pic" />
                </a>
            </div>
        </Box>
    )
}

export default StackRender
