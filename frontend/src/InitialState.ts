import { ProfileType } from "@/ProfileTypes.ts";

const initialState: { likeHistory: ProfileType[]; currentProfile: ProfileType} = {
	currentProfile: getRandomProfile(),
	likeHistory: [getRandomProfile(), getRandomProfile()]
};

export default initialState;


export function getRandomProfile(): ProfileType {
	const idNum = Math.random() * 10000;

	return {
		firstName: `https://loremflickr.com/300/300/animal?lock=${idNum}`,
		lastName: `https://loremflickr.com/75/75/animal?lock=${idNum}`,
		email: `Doggr${idNum}`,
		id: idNum
	};
}
