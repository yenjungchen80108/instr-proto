import Head from "next/head";
import { useRouter } from "next/router";
import Page from "@/events/202501/actPage/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";

import { setActConfig } from "@/events/202501/actPage/store/config/slice";
import reducer from "@/events/202501/actPage/store";

import { fetchConfigInfo } from "@/apis/fetchConfig";
import { deepMerge } from "@/utils/mergeJson";

const IndexPage = ({ configData }) => {
  const { title, description, keywords } = configData.metaData;

  const router = useRouter();
  const { tabs } = router.query;
  const isEditMode = tabs?.includes("edit");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page isEditMode={isEditMode} />
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

    let actConfigData = {};
    let actInstrConfigData = {};
    let combinedConfig = {};

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );

      actConfigData = await fetchConfigInfo({
        configUrl: "/config/events/202501/actPage.json",
      });
      actInstrConfigData = await fetchConfigInfo({
        configUrl: "/config/events/202501/actInstrPage.json",
      });

      combinedConfig = deepMerge(actConfigData, actInstrConfigData);

      console.log({ combinedConfig });
      store.dispatch(setActConfig({ actConfig: combinedConfig }));
    } catch (err) {
      console.log("error", err);
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        configData: combinedConfig,
      },
    };
  }
);
