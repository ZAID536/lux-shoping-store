import { NextRequest, NextResponse } from 'next/server';
import { getAllTeamMembers, createTeamMember } from '@/lib/queries/team';

export async function GET() {
  try {
    const members = await getAllTeamMembers();
    return NextResponse.json(members);
  } catch (err) {
    console.error('GET /api/team error:', err);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.role) {
      return NextResponse.json({ error: 'name and role are required' }, { status: 400 });
    }
    const id = await createTeamMember(body);
    return NextResponse.json({ id, message: 'Team member created' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/team error:', err);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
