export const HandleusersDev = () => {
  //
  const [users, setUsers] = useState<UserResponse[]>([]);

  const [isLoading, setIsLoading] = useState({
    create: false,
    delete: false,
  });

  const someIsLoading = Object.values(isLoading).some(
    (isLoading) => !!isLoading
  );

  const handleStartLoading = (type: "create" | "delete") => {
    setIsLoading({ ...isLoading, [type]: true });
  };

  const handleFinishLoading = (type: "create" | "delete") => {
    setIsLoading({ ...isLoading, [type]: false });
  };

  return (
    <div className="flex gap-10">
      <button
        type="button"
        disabled={someIsLoading}
        className="border border-gray-400 rounded-md bg-gray-400 p-1 font-semibold mt-2 disabled:opacity-75"
        onClick={async () => {
          handleStartLoading("create");
          await createManyUsers(createLimit, fetchUsers);
          handleFinishLoading("create");
        }}
      >
        {!isLoading.create ? `Registrar ${createLimit}` : "Cargando..."}
      </button>
      <button
        type="button"
        disabled={someIsLoading}
        className="border border-gray-400 rounded-md bg-red-400 p-1 font-semibold mt-2 disabled:opacity-75"
        onClick={async () => {
          handleStartLoading("delete");
          await deleteAllUsers(
            users
              .filter(
                (user) => !["DEVELOPER", "SUPER_ADMIN"].includes(user.role)
              )
              .map((user) => user.id),
            fetchUsers
          );
          handleFinishLoading("delete");
        }}
      >
        {!isLoading.delete ? "Eliminar todos" : "Cargando..."}
      </button>
    </div>
  );
};
