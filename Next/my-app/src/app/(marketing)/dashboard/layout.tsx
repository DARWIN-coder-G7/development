export default function DashBoardLayout(
    { children, users, revenues, notifications , login }:
        {
            children: React.ReactNode,
            users: React.ReactNode,
            revenues: React.ReactNode,
            notifications: React.ReactNode,
            login:React.ReactNode
        }) {
            const isLoggedIn = false;
    return isLoggedIn ? (
        <>
        <div>
            <div>{children}</div>

            <div className="flex justify-center" >
                <div className="flex flex-col">
                    <div>{users}</div>
                    <div>{revenues}</div>
                </div>
            <div className=" flex flex-1" >{notifications}</div>
            </div>
        </div>

    </>
    ) : ( login );
}