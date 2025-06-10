// import { useAuth } from "@/AuthContext";
// import { Stack } from "expo-router";

// export default function ProtectedRoute() {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return (
//       <Stack>
//         <Stack.Screen
//           name="(auth)/(login)/index"
//           options={{ headerShown: false }}
//         />
//       </Stack>
//     );
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="home" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
