import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import { problems } from '../../utils/problems';
import { Problem } from '@/utils/problems/types/problem';

type ProblemPageProps = {
problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({problem}) => {
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem}/>
    </div>
  );
};
export default ProblemPage;


export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { pid: key },
  }));
  return {
    paths,
    fallback: false,
  };
}

//getStaticProps => fetch data for the dynamic routes
export async function getStaticProps({ params}: {params: {pid:string}}) {
  const { pid } = params;
  const problem = problems[pid];

  if(!problem) {
    return {
      notFound: true,
    }
  }
  problem.handlerFunction = problem.handlerFunction.toString();
 return {
  props: {
    problem
  }
 }
}