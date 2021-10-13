import styled from "styled-components";

// const switchesFirstline = [
//     {
//       title: "Приветственные баллы",
//       key: "first",
//       description:
//         "Единоразовое начисление баллов клиенту за присоединение к компании",
//       renderRest: renderUnderSwitchFirst,
//       rewardType: 1,
//     },
//     {
//       title: "Баллы ко дню рождения",
//       key: "third",
//       description:
//         "Автоматическое начисление баллов клиенту ко дню его рождения",
//       renderRest: renderSwitchThird,
//       rewardType: 3,
//     },
//   ];

// Right Side
// {switchesSecond.map((item: any, index: number) => {
//     return (
//       <Flex
//         key={index}
//         width="100%"
//         margin="0px 0px 20px 0px"
//         justifyContent="start"
//         alignItems="flex-start"
//         flexDirection="column"
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "start",
//             marginBottom: "15px",
//           }}
//         >
//           <div>
//             <div>
//               <Text fontWeight={500} fontSize="18px">
//                 {item.title}
//               </Text>
//             </div>
//             <div style={{ maxWidth: "340px", minWidth: "340px" }}>
//               <Text fontWeight={300} fontSize="14px">
//                 {item.description}
//               </Text>
//             </div>
//           </div>
//           <div style={{ margin: "10px 0px 10px 20px" }}>
//             <CustomToggle
//               checked={switchStates.includes(item.key)}
//               onChange={(e: any) =>
//                 handleSwitch(e.target.checked, item, index)
//               }
//             />
//           </div>
//         </div>
//         {switchStates.includes(item.key) && (
//           <div style={{ width: "100%" }}>{item.renderRest()}</div>
//         )}
//       </Flex>
//     );
//   })}

// const switchesSecond = [
//     {
//       title: "Баллы за рекомендацию",
//       key: "second",
//       description:
//         "Вознаграждение баллами клиента за друга, пришедшего по рекомендации. Начисляются   после первой операции.",
//       renderRest: renderSwitchSecond,
//       rewardType: 2,
//     },

//     {
//       title: "VIP баллы",
//       key: "fourth",
//       description:
//         "Баллы, которые можно добавить постоянным   пользователям для повышения лояльности.",
//       renderRest: renderSwitchFourth,
//       rewardType: 4,
//     },
//   ];
