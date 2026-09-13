import css from './Loader.module.css';

interface LoaderProps {
  title: string;
  text: string;
}

export default function Loader({ title, text }: LoaderProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.card} role="status">
        <span className={css.spinner} />

        <div className={css.message}>
          <p className={css.title}>{title}</p>
          <p className={css.text}>{text}</p>
        </div>
      </div>
    </div>
  );
}
