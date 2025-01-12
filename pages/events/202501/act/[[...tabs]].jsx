import Head from "next/head";

import Page from "@/events/202501/actPage/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";

import { setActConfig } from "@/events/202501/actPage/store/config/slice";
import reducer from "@/events/202501/actPage/store";

import { fetchConfigInfo } from "@/apis/fetchConfig";

const IndexPage = ({ configData }) => {
  const { title, description, keywords } = configData.metaData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page />
    </>
  );
};

export default withEventReducer(IndexPage, {
  reducerPath: "actPage202501",
  reducer,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { res } = context;

    let configData = {};

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );
      configData = await fetchConfigInfo({
        configUrl: "/config/events/202501/actPage.json",
      });
      // console.log({ configData });
      store.dispatch(setActConfig({ actConfig: configData }));
    } catch (err) {
      console.log("error", err);
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        configData,
      },
    };
  }
);
