import { isThisMinute } from "date-fns";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import parseISO from "date-fns/parseISO";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import Image from "next/image";
import Link from "next/link";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

import styles from "./episode.module.scss";

// --------------------------- tipagem dos dados

// tipagem do episódio
type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: string;
  durationAsString: string;
  url: string;
  publishedAt: string;
  description: string;
};

// // tipagem dos episodes
type EpisodeProps = {
  episode: Episode;
};

//------------------------ mostrando na tela -------------------------------------

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href={"/"}>
          <button type="button">
            <img src="/arrow-left.svg" alt="voltar a home" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button type="button">
          <img src="/play.svg" alt="tocar o episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
//------------------------ mostrando na tela -------------------------------------

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
