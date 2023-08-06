import { NextRequest, NextResponse } from 'next/server'

// export const GET = (request: NextRequest) => { //simple GET API
//     const name = request.nextUrl.searchParams.get("name") //finds and get th value of variable name passed in the url of the api
//     return new NextResponse(`Hello ${name}`) //that name is recieved as response of the api. Recieved in text format
// }


// export const GET = (request: NextRequest) => {
//     const name = request.nextUrl.searchParams.get("name");
//     return NextResponse.json({
//         message: `Hello ${name}`
//     }); /*data is returned in json format. Note that no new is added
//     with next response because function (json) of a class (NextResponse) is called. */
// }


// export const POST = async (request: NextRequest) => { //simple POST request
//     const body = await request.json() //body that is sent along the request when called is extracted here
//     return NextResponse.json({ //data extracted above is displayed here along the message in response
//         data: body,
//         message: 'Data is created'
//     })
// }


// export const PUT = async (request: NextRequest) => { /*used to update complete instance of something. You send complete resource
//     that you want to update*/
//     const body = await request.json();
//     return NextResponse.json({
//         message: "Data is updated successfully."
//     })
// }


// export const DELETE = async (request: NextRequest) => {
//     const body = await request.json();
//     return NextResponse.json({
//         message: "Data successful deleted",
//         id: body.id
//     })
// }