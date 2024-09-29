import { bookCSS, contentCSS, headerCSS, pageCSS, articleCSS } from "@/css/config"
import { run } from "@/css/boomer.config";
import { TimeRange } from "./time-range"
import { Expertise } from "./expertise"

run()

export default function Home() {
  return (
    <main className={bookCSS({})}>
      <article className={pageCSS({ layout: "experience" })}>
        <header className={headerCSS({})}>
          <h1>Arthur Juchereau</h1>
          <h2>Principal Engineer</h2>
        </header>
        <aside className={contentCSS({ area: "sidebar" })}>
          <section>
            <h3>
              Contact
            </h3>
            <ul>
              <li>
                +1 234 567 8900
              </li>
              <li>
                hello@test.com
              </li>
              <li>
                hello.test.com
              </li>
              <li>
                github.com/PookMook
              </li>
              <li>
              youtube.com/@rthurJ
              </li>
              <li>
              x.com/rthurJ_
              </li>
              <li>
                A place, State, Country
              </li>
            </ul>
          </section>
          <section>
            <h3>
              Skills
            </h3>
            <ul>
              <li>
                Web technologies, from server to user&apos;s display
              </li>
              <li>
                Engineering management
              </li>
              <li>
                Audio & video production
              </li>
              <li>
                Conference, Teaching & Meetup lecturer
              </li>
            </ul>
          </section>
          <section>
            <h3>
              Education
            </h3>
            <article className={articleCSS({ type: "education" })}>

              <h5>
                DESS Arts, Creation and Technologies
              </h5>
              <h4>University of Montreal</h4>
              <TimeRange start="2013-09-01" end="2014-08-31" short={true} />
              <ul>
                <li>
                  Master level specialization in application of technologies in purpose-first projects</li>
                <li>live streaming </li>
                <li>audio engineering</li>
              </ul>
            </article>
            <article className={articleCSS({ type: "education" })}>

              <h5>
                Master in Network Architecture and Web development
              </h5>
              <h4>
                Paris VI (UPMC)
              </h4>
              <TimeRange start="2007-09-01" end="2013-08-31" short={true} />
              <ul>
                <li>
                  1 year prepa SUPINFO, 2 years as TA in the web lab</li>
                <li> then transferred credits to complete my master at UPMC.
                </li>
              </ul>
            </article>
          </section>
          <section>
            <h3>
              Languages
            </h3>
            <ul>
              <li>
                English
              </li>
              <li>
                French
              </li>
            </ul>
          </section>
        </aside>
        <main className={contentCSS({ area: "content" })}>
          <section>
            <h3>
              Profile
            </h3>
            <p>

              With 10 years as a full stack engineer, I excel in diverse technologies and environments, adept at learning on the go to meet any requirement.
            </p>
            <p>
              I have a strong affinity for CSS and web APIs, prioritizing focused work to solve core issues effectively, rather than deferring them.
            </p>
          </section>
          <section>
            <h3>
              Work Experience
            </h3>
            <article className={articleCSS({ type: "experience" })}>
              <h4>
                Principal Engineer
              </h4>
              <TimeRange start="2020-02-15" end="now" />
              <h5>
                Welbi
              </h5>
              <ul>

<li>Scaled infrastructure and coding practices to accommodate a x135 increase in client base.</li>
<li>Spearheaded the development of pivotal Welbi platform features: HQ dashboard, WYSIWYG Print Calendar, Family Portal, Admin Portal.</li>
<li>Implemented a design system resulting in faster development cycles and improved workflow efficiency.</li>
<li>Facilitated knowledge transfer and cultural integration for new team members across tech and business functions.</li>
<li>Resolved organizational challenges by leveraging business insights and addressing client pain points, ensuring high employee efficiency while maintaining robust security practices in a SOC2 environment.</li>
        </ul>
            </article>
            <article className={articleCSS({ type: "experience" })}>
              <h4>
                Head Developer at Canadian research Chair on Digital Textualities
              </h4>
              <h5>
                University of Montreal
              </h5>
              <TimeRange start="2017-06-15" end="2019-09-31" />
              <ul>

              <li>eveloped custom academic platforms covering various topics. Conducted domain research, identified pain points, and defined specifications through rapid prototyping and iterative feedback. Engaged in conference panels to gather broader academic community input.</li>
              <li>Created &quot;Stylo&quot; an offline-first text editor synchronized online for academic paper writers. Reduced publication time by approximately 3 months and saved an average of $2000 per article by autonomously managing citations and metadata.</li>

              <li>Launched &quot;Anthologia&quot; facilitating crowdsourced transcription and translation of ancient Greek parchments. Adopted in 30 countries, enhancing student engagement with original texts and translations in seven languages.</li>

              <li>Engineered &quot;Lightium&quot; a self-contained university workgroup presentation website in a Docker container. Enabled instant deployment on approved servers, saving approximately 3 months of setup time and associated costs for starting and funding university projects.</li>
              </ul>
            </article>
            <article className={articleCSS({ type: "experience" })}>
              <h4>
                Founding Engineer / CTO
              </h4>
              <h5>
                LaunchLeap
              </h5>
              <TimeRange start="2014-07-01" end="2017-06-15" />

              <ul>

                <li>
                Developed a crowdsourcing platform enabling creators to gather audience insights for validation, brainstorming, and recommendations. Also served as a CRM allowing creators to segment their audience for targeted research and engagement purposes.                </li>
              </ul>
            </article>
          </section>

        </main>

      </article >
      <article className={pageCSS({layout:"portfolio"})}>

      <header className={headerCSS({})}>
          <h1>Arthur Juchereau</h1>
          <h2>Principal Engineer</h2>
        </header>
        <aside className={contentCSS({ area: "sidebar" })}>
          <section>
            <h3>
              Technical Performance
            </h3>
            <p>Recorded by TripleByte (R.I.P.) in 2020</p>
            <ul>
              <li>Front-End Coding Productivity</li>
              <Expertise level={5}/>
              <li>Front-End</li>
              <Expertise level={4}/>
              <li>Back-End</li>
              <Expertise level={4}/>
              <li>JavaScript Knowledge</li>
              <Expertise level={3}/>
              <li>Full-Stack Architecture</li>
              <Expertise level={3}/>
              <li>Algorithms & Data Structures</li>
              <Expertise level={3}/>
              <li>General coding logic</li>
              <Expertise level={3}/>
            </ul>
        </section>
        <section>
            <h3>
              Hobbies
            </h3>
            <ul>
              <li>Coding</li>
              <li>Hiking</li>
              <li>Audio & Video</li>
              <li>Manually building furniture</li>
            </ul>
          </section>
        </aside>
        <main  className={contentCSS({ area: "content" })}>
          <section>
            <h3>Side Projects</h3>
            <p>Currently writing this section, please come back later</p>
          </section>
          <section>
            <h3>Talks</h3>
            <p>Currently writing this section, please come back later</p>
          </section>
          <section>
            <h3>Next Projects</h3>
            <p>Currently writing this section, please come back later</p>
          </section>
        </main>
      </article>
    </main >
  );
}
