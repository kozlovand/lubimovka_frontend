
import { AppLayout } from 'components/app-layout';
import { PageBreadcrumbs } from 'components/page';
import { ProjectLayout } from 'components/project-layout';
import { Breadcrumb } from 'components/breadcrumb';
import { ProjectHeadline } from 'components/project-headline';
import { ConstructorContent } from 'components/constructor-content';
import { SEO } from 'components/seo';
import { fetcher } from 'services/fetcher';

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import type { Project as ProjectModel } from 'api-typings';

const Project = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    title,
    intro,
    description,
    image,
    contents,
  } = props;

  return (
    <AppLayout>
      <SEO
        title={title}
        description={description}
      />
      <ProjectLayout>
        <PageBreadcrumbs>
          <Breadcrumb
            text="Проекты"
            path="/projects"
          />
        </PageBreadcrumbs>
        <ProjectHeadline
          title={title}
          intro={intro}
          image={image}
        />
        <ProjectLayout.Description>
          {description}
        </ProjectLayout.Description>
        <ConstructorContent
          variant="project"
          // @ts-expect-error
          blocks={contents}
        />
      </ProjectLayout>
    </AppLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext<Record<'id', string>>) => {
  const notFoundResult = {
    notFound: true,
  } as const;

  if (!ctx.params) {
    return notFoundResult;
  }

  const { id: projectId } = ctx.params;
  let project: ProjectModel;

  try {
    project = await fetcher(`/projects/${projectId}/`);
  } catch {
    return notFoundResult;
  }

  return {
    props: {
      ...project,
    },
  };
};

export default Project;
