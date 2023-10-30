from sqlalchemy.sql import text
from datetime import datetime

from app.models import Capstone, db, environment, SCHEMA

def seed_capstones():
    capstones = [
        Capstone(title="Samsong", url="https://samsung.com/", description="Samsong will be an electronics and technology company known for producing a wide range of consumer electronics, appliances, and innovative tech products, closely resembling Samsung. Samsong's goal will be to provide cutting-edge devices, such as smartphones, televisions, home appliances, and more, offering quality, innovation, and reliability, much like Samsung. It will strive to continue being a global leader in the electronics industry under the name Samsong.", user_id='auth0|1', cloned_from='Samsung', created_at=datetime.strptime("1938-03-01T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Microsoftic", url="https://microsoft.com/", description="Microsoftic will be a technology and software corporation closely resembling Microsoft. It will focus on developing a wide range of software products, including operating systems, productivity tools, cloud services, and more. Microsoftic's mission will be to empower individuals and organizations with innovative and reliable technology solutions, similar to Microsoft's commitment to enhancing productivity and enabling digital transformation. It will aim to be a leading player in the tech industry under the name Microsoftic.", user_id='auth0|2', cloned_from='Microsoft', created_at=datetime.strptime("1975-04-04T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Yahoot", url="https://www.yahoo.com/", description="Yahoot will closely resemble Yahoo as a web portal and internet services platform. Users will enjoy features like a robust search engine, news aggregation, email services, and an extensive directory of websites and resources. The platform will offer a customizable homepage, allowing users to tailor their online experience by adding widgets, news feeds, and other content. Yahoot aims to provide a familiar and comprehensive online destination, mirroring the essence of Yahoo.", user_id='auth0|3', cloned_from='Yahoo', created_at=datetime.strptime("1994-01-01T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Congo", url="https://www.amazon.com/", description="Congo will be an e-commerce and online retail platform offering a vast selection of products and services. Users can browse and shop for items ranging from electronics and fashion to books and household goods. The platform will provide features like user reviews, product recommendations, and a seamless checkout process. Congo will also offer a subscription service for faster shipping and access to streaming content, just like Amazon Prime. The goal is to create a convenient and comprehensive online shopping destination, closely resembling the Amazon experience under the name Congo.", user_id='auth0|4', cloned_from='Amazon', created_at=datetime.strptime("1994-07-05T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="TradeBay", url="https://eBay.com/", description="TradeBay will be an online marketplace and e-commerce platform, closely resembling eBay. Users can buy and sell a wide variety of products, including new and used items, collectibles, and more. TradeBay will prioritize user-friendly listings, secure transactions, and a trusted seller and buyer community, similar to eBay. It will aim to provide a reliable platform for online shopping and selling under the name TradeBay.", user_id='auth0|5', cloned_from='eBay', created_at=datetime.strptime("1995-09-03T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="FlixNet", url="https://netflix.com/", description="FlixNet will be a streaming platform offering a vast library of movies, TV shows, documentaries, and original content, closely resembling Netflix. Users can subscribe to access a wide range of entertainment options, stream content on multiple devices, and create personalized watchlists. FlixNet will prioritize user-friendly navigation, content discovery, and high-quality streaming, aiming to provide an enjoyable and immersive entertainment experience, much like Netflix. It will be a go-to destination for binge-worthy shows and cinematic experiences under the name FlixNet.", user_id='auth0|6', cloned_from='Netflix', created_at=datetime.strptime("1997-08-29T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Google.com", url="https://www.google.com/", description="The concept behind Google.com is to revolutionize the way people access information on the internet. It will be a pioneering search engine designed to deliver incredibly fast and accurate search results. Google.com will use advanced crawling and indexing techniques to systematically organize the vast amount of web content, ensuring that users can find relevant information quickly and easily. The website's user interface will be intuitive, featuring a minimalist design with a single search bar that allows users to enter their queries. The goal is to provide an unmatched search experience that will make Google.com the go-to destination for anyone looking for information online, setting the stage for its future success and prominence in the digital world.", user_id='auth0|7', cloned_from='Original Idea', created_at=datetime.strptime("1998-09-04T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Infopedia", url="https://www.wikipedia.com/", description="Infopedia will serve as a user-generated knowledge repository, just like Wikipedia. It will provide a platform where individuals from around the world can collaboratively create and edit articles on a wide range of topics. Infopedia will have a clean and intuitive interface, allowing users to browse, search for, and contribute to articles. Like Wikipedia, it will encourage a community of editors to maintain the quality and accuracy of its content through a system of citations and references. The ultimate goal is to make reliable, unbiased information freely accessible to anyone with an internet connection, fostering a global community of knowledge-sharing and learning.", user_id='auth0|8', cloned_from='Wikipedia', created_at=datetime.strptime("2001-01-15T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="LinkUp", url="https://www.linkedIn.com/", description="LinkUp will serve as a professional networking platform, closely mirroring LinkedIn. Users can create profiles, connect with other professionals, and showcase their skills and experiences. The platform will provide job listings, company pages, and tools for networking and career development. LinkUp's primary goal will be to facilitate professional connections, job opportunities, and industry insights, much like LinkedIn. It will empower users to grow their careers and expand their professional networks under the name LinkUp.", user_id='auth0|9', cloned_from='LinkedIn', created_at=datetime.strptime("2002-12-28T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="FaceBook", url="https://www.facebook.com/", description="Facebook.com will be a groundbreaking social networking website designed to connect people and facilitate communication and sharing online. Users will have the ability to create profiles, add friends, and share updates, photos, and other content with their network. The platform will provide features for private messaging, groups, and events, enabling users to stay connected with friends and family while also making new connections. The goal is to create a digital space that fosters social interactions and helps people build and maintain relationships in the digital age, ultimately transforming the way we connect and share in the online world.", user_id='auth0|10', cloned_from='Original Idea', created_at=datetime.strptime("2004-02-04T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Readit", url="https://www.reddit.com/", description="Readit will function as an online community and discussion platform, closely resembling Reddit. Users can join various subforums (known as 'subreddits' on Reddit) to discuss a wide range of topics, share links, and engage in conversations. They can upvote and downvote content to determine its visibility. Readit will prioritize user-generated content and foster a sense of community, much like Reddit. It will provide a platform for users to share their interests, opinions, and knowledge with others under the name Readit.", user_id='auth0|11', cloned_from='Reddit', created_at=datetime.strptime("2005-06-23T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="YouTube", url="https://www.youtube.com/", description="YouTube.com will be a platform for users to upload, share, and discover videos. It will feature an intuitive interface that allows content creators to upload videos and share them globally. Users will be able to search for videos on a wide range of topics, watch them in high-quality streaming, and engage with the content through likes, comments, and shares. The goal is to provide a revolutionary platform for the online video community, shaping the future of how people create, consume, and interact with video content.", user_id='auth0|12', cloned_from='Original Idea', created_at=datetime.strptime("2005-02-14T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Twitter", url="https://www.twitter.com/", description="Twitter will be a platform designed for users to share short, concise messages called 'tweets' with the world. Each tweet will have a character limit, encouraging brevity and rapid communication. Users will have the ability to follow other users, and their timelines will display a chronological feed of tweets from those they follow. Twitter will also introduce the concept of hashtags, allowing users to categorize and discover tweets on specific topics. The platform's primary goal is to facilitate real-time conversations, news sharing, and the exchange of ideas on a global scale. Over time, it will become a major player in the social media landscape, transforming how people engage with current events, trends, and conversations online.", user_id='auth0|13', cloned_from='Original Idea', created_at=datetime.strptime("2006-03-21T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="BlockWorld", url="https://Roblox.com/", description="BlockWorld will be a user-generated online gaming platform, closely resembling Roblox. Users can create, play, and share games and experiences within a virtual world built on customizable blocks and elements. BlockWorld will prioritize creativity, game development, and a social gaming environment, similar to Roblox. It will aim to provide a platform where users can unleash their imagination and game development skills under the name BlockWorld.", user_id='auth0|14', cloned_from='Roblox', created_at=datetime.strptime("2006-09-01T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="QuackQuackSearch", url="https://DuckDuckGo.com/", description="QuackQuackSearch will be a privacy-focused search engine, closely resembling DuckDuckGo. Users can conduct web searches without their data being tracked, ensuring their online privacy. QuackQuackSearch will prioritize user anonymity, providing accurate search results while respecting user privacy, just like DuckDuckGo. It will aim to be a trusted and privacy-conscious alternative for online searches under the name QuackQuackSearch.", user_id='auth0|15', cloned_from='DuckDuckGo', created_at=datetime.strptime("2008-02-29T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="RingABing", url="https://bing.com/", description="RingABing will be a search engine platform, closely resembling Bing. Users can utilize it to perform web searches, find information, and discover online content. RingABing will aim to provide accurate search results, a user-friendly interface, and various search features to help users find what they're looking for quickly and efficiently, much like Bing. It will be a reliable search engine for internet users under the name RingABing.", user_id='auth0|16', cloned_from='Bing', created_at=datetime.strptime("2009-05-28T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Askiverse", url="https://Quora.com/", description="Askiverse will be a community-driven question-and-answer platform, closely resembling Quora. Users can ask questions, provide answers, and engage in discussions on a wide range of topics. Askiverse will prioritize knowledge sharing, expertise, and a user-friendly interface, much like Quora. It will aim to be a valuable resource for users seeking answers and insights across various subjects under the name Askiverse.", user_id='auth0|17', cloned_from='Quora', created_at=datetime.strptime("2009-06-21T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="InstaGram", url="https://www.instagram.com/", description="Instagram.com will be a visually-oriented platform designed for users to share photos and short video clips with their followers. It will focus on mobile devices and feature a user-friendly app for capturing and editing photos and videos. Users will be able to apply creative filters, captions, and hashtags to their posts, making it easy to discover and engage with content from a diverse range of users and interests. The platform's primary aim is to provide a space for self-expression, creativity, and visual storytelling, redefining how people connect through images in the digital age. Instagram.com will go on to become a major player in the world of social media, shaping the way we share and interact with visual content online.", user_id='auth0|18', cloned_from='Original Idea', created_at=datetime.strptime("2010-10-06T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="ZoomIn", url="https://zoom.com/", description="ZoomIn will be a video conferencing and online collaboration platform, closely resembling Zoom. Users can host and join virtual meetings, webinars, and collaborative sessions, sharing video, audio, and screens in real-time. ZoomIn will prioritize user-friendly interface design, robust features for remote work and communication, and security, just like Zoom. It will aim to provide a seamless and reliable video conferencing experience under the name ZoomIn.", user_id='auth0|19', cloned_from='Zoom', created_at=datetime.strptime("2011-04-21T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="Stitch", url="https://twitch.tv/", description="Stitch will be a live streaming and content creation platform, closely resembling Twitch. Users can broadcast their gameplay, share live commentary, and interact with their audience in real-time through chat and other features. Stitch will be a go-to platform for gamers and content creators to share their passion and connect with their communities under the name Stitch.", user_id='auth0|20', cloned_from='Twitch', created_at=datetime.strptime("2014-02-10T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="DisString", url="https://discord.com/", description="DisString will be a communication platform closely resembling Discord. Users can create servers and channels for text, voice, and video communication, as well as share files and engage in real-time conversations with friends, communities, or colleagues. DisString will prioritize user-friendly interface design, server management, and customization options for a seamless and collaborative chat experience, much like Discord. It will be a go-to platform for online communities and group communication under the name DisString.", user_id='auth0|21', cloned_from='DisCord', created_at=datetime.strptime("2015-05-13T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="ClosedAI", url="https://openai.com/", description="ClosedAI will be an artificial intelligence research and development organization dedicated to advancing the field of AI. It will focus on cutting-edge research, developing innovative AI models and technologies, and promoting ethical and responsible AI practices, much like OpenAI. ClosedAI's aim will be to push the boundaries of AI capabilities while prioritizing safety, ethics, and the betterment of humanity. It will strive to create AI solutions that have a positive and lasting impact on society under the name ClosedAI.", user_id='auth0|22', cloned_from='OpenAI', created_at=datetime.strptime("2015-12-11T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="TokTik", url="https://www.tiktok.com/", description="TokTik will be a social media platform dedicated to short-form video content. Users can create and share engaging videos, add music, special effects, and use creative filters. The platform will feature a feed of trending and personalized content, and users can follow and interact with other creators. TokTik will encourage creativity and provide a space for viral video trends and challenges, much like TikTok. It will offer a user-friendly interface, making it easy for people to discover, create, and share entertaining video content under the name TokTik.", user_id='auth0|23', cloned_from='TikTok', created_at=datetime.strptime("2016-09-01T00:00:00Z", "%Y-%m-%dT%H:%M:%SZ")),
        Capstone(title="ClimateCast", url="https://weather.com/", description="ClimateCast will be an online platform that provides up-to-date weather forecasts, current conditions, and climate information, closely resembling weather services. Users can access accurate weather data, forecasts, and interactive maps for their local area or any location worldwide. ClimateCast will offer a user-friendly interface, customizable weather alerts, and a variety of meteorological data, helping users stay informed about weather conditions, much like traditional weather services. It will be a trusted source for weather information under the name ClimateCast.", user_id='auth0|24', cloned_from='Weather', created_at=datetime.utcnow()),
        Capstone(title="Lifeless", url="https://www.live.com/", description="Lifeless will serve as an online platform providing a range of services similar to Live.com. Users can access email services, cloud storage, and productivity tools. The platform will facilitate real-time collaboration and communication. However, it will be a tongue-in-cheek reference to the 'Live' concept, embracing a humorous and ironic take on the name. Despite its quirky name, Lifeless will aim to be a robust and reliable online platform for various digital needs.", user_id='auth0|25', cloned_from='Live', created_at=datetime.utcnow()),
        Capstone(title="CapTracker", url="https://captracker-t69u.onrender.com", description="I wanted to leverage my newly acquired coding skills after completing the App Academy bootcamp to address an issue I observed with the existing 'Progress Tracker' on the platform. Many users seemed dissatisfied with it, so I set out to modernize and improve the concept, focusing on enhancing the way users share their final projects, also known as Capstones. The goal is to foster a community where developers can openly share their work, receive constructive feedback, and collaborate without the pressure of star ratings or rankings that might discourage participation.", user_id='auth0|26', cloned_from='Progress Tracker', created_at=datetime.utcnow()),
        Capstone(title="Demo CapStone", url="https://example.com/", description="This educational project is a creative showcase of technical proficiency, employing a stack that includes JavaScript and Python for coding, Postgres for data management, AWS for the storage of images, and Material UI for design. Feel free to explore the project to witness how these technologies have been harnessed to craft a distinctive and innovative project. It's important to note that this is purely a demonstration and does not pertain to any real-world product or service. Enjoy your exploration and take away insights from this tech stack showcase!", user_id='auth0|27', cloned_from='Original Idea', created_at=datetime.utcnow())
    ]
    # datetime.utcnow() -- 2023-09-07 15:55:26.873143
    for capstone in capstones:
        db.session.add(capstone)
    db.session.commit()

def undo_capstones():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.capstones RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.capstoneimages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM capstones"))
        db.session.execute(text("DELETE FROM capstoneimages"))
        db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
