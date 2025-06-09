export default function AboutPage() {
  return (
    <div className="bg-secondary-light rounded-2xl shadow-heavy mx-auto mb-[3rem] max-w-[900px]">
      <div className="p-[3rem] text-text-light">
        <h2 className="text-[2rem] mb-[1.5rem] text-primary border border-b-2 border-b-primary pb-[0.5rem]">
          Quiénes Somos
        </h2>
        <p>
          Somos un equipo de desarrolladores apasionados por la tecnología y los
          deportes. Nuestra misión es crear plataformas que faciliten la
          organización y participación en torneos de diversas disciplinas.
        </p>

        <h3>Nuestro Equipo</h3>
        <p>
          Nuestro equipo está formado por profesionales con amplia experiencia
          en desarrollo web, diseño de interfaces y gestión de eventos
          deportivos:
        </p>

        <ul className="my-[1.5rem] p-[2rem]">
          <li className="mb-[0.8rem]">
            <strong>Edmond Gazal</strong> - Desarrollador Frontend
          </li>
          <li className="mb-[0.8rem]">
            <strong>Gabriel Prado</strong> - Desarrollador Backend
          </li>
        </ul>

        <h3>Sobre la Aplicación</h3>
        <p>
          Esta plataforma ha sido diseñada para facilitar la gestión,
          organización y participación en torneos de futbol. Nuestro objetivo es
          proporcionar una herramienta intuitiva y completa tanto para
          organizadores como para participantes.
        </p>

        <p>Características principales de nuestra aplicación:</p>

        <ul className="my-[1.5rem] p-[2rem]">
          <li className="mb-[0.8rem]">
            Gestión completa de torneos y competiciones
          </li>
          <li className="mb-[0.8rem]">
            Seguimiento en tiempo real de resultados
          </li>
          <li className="mb-[0.8rem]">
            Estadísticas detalladas de equipos y jugadores
          </li>
          <li className="mb-[0.8rem]">Historial completo de torneos creados</li>
          <li className="mb-[0.8rem]">
            Interfaz adaptable a diferentes dispositivos
          </li>
        </ul>

        <h3>Nuestra Visión</h3>
        <p>
          Aspiramos a convertirnos en la plataforma de referencia para la
          organización de torneos deportivos, facilitando la conexión entre
          organizadores, participantes y aficionados. Creemos en el poder del
          deporte como herramienta de unión y desarrollo personal, y queremos
          contribuir a su promoción mediante el uso de la tecnología.
        </p>

        <p>
          Estamos comprometidos con la mejora continua de nuestra plataforma,
          incorporando nuevas funcionalidades y optimizando las existentes en
          base a la retroalimentación de nuestros usuarios.
        </p>

        <h3>Contacto</h3>
        <p>
          Si tienes alguna pregunta, sugerencia o comentario, no dudes en
          ponerte en contacto con nosotros a través de uno de los siguientes
          correos:
        </p>
      </div>
    </div>
  );
}
