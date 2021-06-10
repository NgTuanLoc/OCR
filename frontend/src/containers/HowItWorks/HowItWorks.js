import Draw from "../../components/Draw/Draw";

const HowItWorks = () => {
  return (
    <section id="howitworks" class="section">
      <div class="title">
        <h2>
          How <span>It works</span>
        </h2>
      </div>
      <div className="howitworks--canvas">
        <Draw />
      </div>
    </section>
  );
};

export default HowItWorks;
