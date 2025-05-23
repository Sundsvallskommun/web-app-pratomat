import { ListResources } from '@components/list-resources/list-resources';
import { ListToolbar } from '@components/list-toolbar/list-toolbar';
import resources from '@config/resources';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Header } from '@layouts/header/header.component';
import Main from '@layouts/main/main.component';
import { Spinner } from '@sk-web-gui/react';
import { useResource } from '@utils/use-resource';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { capitalize } from 'underscore.string';

export const Exempelsida: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const resource = 'assistants';
  const { data, refresh, loaded, loading } = useResource(resource);

  useEffect(() => {
    if (!resource) {
      router.push('/');
    }
  }, [resource]);

  const getProperties = () => {
    return data?.[0] ?
        Object.keys(data[0]).filter((key) => {
          const type = typeof data[0][key];
          return type === 'string' || type === 'number' || type === 'boolean';
        })
      : undefined;
  };

  return (
    resource && (
      <DefaultLayout title={`${capitalize(t(`${resource}:name_many`))} - ${process.env.NEXT_PUBLIC_APP_NAME}`}>
        <Main>
          <Header>
            <span className="flex flex-row gap-16">
              <h1 className="leading-h4-sm">{capitalize(t(`${resource}:name_many`))}</h1>
              {loading && <Spinner size={2.5} className="leading-h4-sm" />}
            </span>
            <ListToolbar resource={resource} onRefresh={refresh} properties={getProperties()} />
          </Header>
          {loaded && <ListResources resource={resource} data={data} />}
        </Main>
      </DefaultLayout>
    )
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout', 'crud', ...Object.keys(resources)])),
  },
});

export default Exempelsida;
