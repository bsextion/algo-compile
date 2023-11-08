import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/problems/types/problem"
import { useAuthState } from "react-firebase-hooks/auth";
import { problems } from "@/mockData/problems";
import { set } from "firebase/database";

type ProblemsTableProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoading }) => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: '',
  });

  const problems: DBProblem[] = useGetProblems(setLoading);
  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: '' });
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <tbody className='text-white'>
        {problems.map((problem, index) => {
          const difficultyColor =
            problem.difficulty === 'Easy'
              ? 'text-dark-green-s'
              : problem.difficulty === 'Medium'
              ? 'text-dark-yellow'
              : 'text-dark-pink';
          return (
            <tr
              className={`${index % 2 == 1 ? 'bg-dark-layer-1' : ' '}`}
              key={problem.id}
            >
              <th className='px-2 py-4 font-medium whitespace-normal text-dark-green-s'>
                <BsCheckCircle fontSize={'18'} width='18' />
              </th>
              <td className='px-6 py-4'>
              {problem.link ? (
									<Link
										href={problem.link}
										className='hover:text-blue-600 cursor-pointer'
										target='_blank'
									>
										{problem.title}
									</Link>
								) : (
									<Link
										className='hover:text-blue-600 cursor-pointer'
										href={`/problems/${problem.id}`}
									>
										{problem.title}
									</Link>
								)}
              </td>
              <td className={`px-6 py-4 ${difficultyColor}`}>
                {problem.difficulty}
              </td>
              <td className={`px-6 py-4`}>{problem.category}</td>
              <td className={`px-6 py-4`}>
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={'28'}
                    className='cursor-pointer hover:text-red-500'
                    onClick={() =>
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className='text-gray-400'>Coming Soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {youtubePlayer.isOpen && (
        <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
          <tr
            className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
            onClick={closeModal}
          ></tr>
          <tr className='w-full z-50 h-full px-6 relative max-w-4xl'>
            <td className='w-full h-full flex items-center justify-center relative'>
              <div className='w-full relative'>
                <IoClose
                  onClick={closeModal}
                  fontSize={'35'}
                  className='cursor-pointer absolute -top-16 right-0'
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading='lazy'
                  iframeClassName='w-full min-h-[500px]'
                />
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );
};
export default ProblemsTable;

function useGetProblems(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
  const [problems, setProblems] = useState<DBProblem[]>([]);
  useEffect(() => {
		const getProblems = async () => {
			// fetching data logic
			setLoading(true);
			const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
			const querySnapshot = await getDocs(q);
			const tmp: DBProblem[] = [];
			querySnapshot.forEach((doc) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
			setProblems(tmp);
      setLoading(false); 
		};

		getProblems();
	}, []);
	return problems
}
