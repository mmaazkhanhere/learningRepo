/*This component fetches a list of users and renders each user avatar, name, and
user name in a list format. It provides a simple interface for users to discover
and follow other users within the application */

import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';

const FollowBar = () => {

    const { data: users = [] } = useUsers(); /*The useUsers hook is used to fetch
    list of user data */

    if (users.length === 0) {
        /*If no user exists, nothing is rendered */
        return null;
    }

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
                {/*Title */}
                <h2 className="text-white text-xl font-semibold">
                    Who to follow
                </h2>
                {/*List of users */}
                <div className="flex flex-col gap-6 mt-4">
                    {
                        users.map((user: Record<string, any>) => (
                            /*Record is a utility type used to define an object
                            type with string keys and values of a specified type
                            It is often used to when the exact shape of an
                            object is not known in advance or when you want 
                            to ensure that all keys in an object have values of
                            a certain type */
                            <div key={user.id} className="flex flex-row gap-4">

                                {/*User Avatar */}
                                <Avatar userId={user.id} />

                                <div className="flex flex-col">

                                    {/*User name */}
                                    <p className="text-white font-semibold text-sm">
                                        {user.name}</p>
                                    <p className="text-neutral-400 text-sm">

                                        {/*username */}
                                        @{user.username}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FollowBar;